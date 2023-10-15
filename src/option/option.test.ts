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

  await t.step("then()", () => {
    new Some("Hello")
      .then((value) => value.toUpperCase())
      .then((value) => new Some(value.replaceAll("L", "R")))
      .map((value) => {
        assertEquals(value, "HERRO")
      })
  })

  await t.step("defaultWith()", () => {
    const option = new Some("Hello")
      .bind((_) => {
        const typeWrangling: Option<string> = new None()
        return typeWrangling
      })
      .map((value) => {
        assert(value, "unreachable")
        return value
      })
      .defaultWith("Fallback")

    assertEquals(option, "Fallback")
  })

  await t.step("from()", () => {
    assert(Option.from("Hello").isSome())
    assert(Option.from("").isSome())
    assert(Option.from(0).isSome())
    assert(Option.from(null).isNone())
    assert(Option.from(undefined).isNone())
  })

  await t.step("value", () => {
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
