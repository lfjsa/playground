import {
  assert,
  assertEquals,
  assertFalse,
  assertThrows,
} from "std/assert/mod.ts"
import { None, Option, Some } from "./option.ts"

Deno.test("Option", async (t) => {
  await t.step("isSome()", () => {
    const some: Option<string> = new Some("Hello")

    assert(some.isSome())
    assertFalse(some.isNone())
  })

  await t.step("isNone()", () => {
    const none: Option<string> = new None()

    assert(none.isNone())
    assertFalse(none.isSome())
  })

  await t.step("map()", () => {
    new Some("Hello")
      .map((value) => value.toUpperCase())
      .map((value) => {
        assertEquals(value, "HELLO")
      })

    new None()
      .map((value) => {
        assert(value, "unreachable")
      })
  })

  await t.step("bind()", () => {
    new Some("Hello")
      .bind((value) => new Some(value.toUpperCase()))
      .map((value) => {
        assertEquals(value, "HELLO")
      })

    new Some("Hello")
      .bind((_) => new None())
      .map((value) => {
        assert(value, "unreachable")
      })
  })

  await t.step("default()", () => {
    const option: Option<string> = new None()

    option
      .map((value) => {
        assert(value, "unreachable")
        return value
      })
      .default("Hello")
      .map((value) => {
        assertEquals(value, "Hello")
      })
  })

  await t.step("value()", () => {
    const none: Option<string> = new None()
    if (none.isSome()) {
      assertFalse(none.value, "unreachable")
    } else {
      assertThrows(
        () => {
          const n: Option<string> = none
          n.value
        },
        Error,
        "fak",
      )
    }

    const some: Option<string> = new Some("Hello")
    if (some.isSome()) {
      assertEquals(some.value, "Hello")
    } else {
      assertFalse((some as Some<string>).value, "unreachable")
    }
  })
})
