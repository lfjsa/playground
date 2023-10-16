import { assert, assertEquals, assertFalse } from "std/assert/mod.ts"
import {
  bind,
  defaultWith,
  from,
  isNone,
  isSome,
  map,
  none,
  some,
} from "./optionFn.ts"

Deno.test("OptionFn", async (t) => {
  await t.step("isSome()", () => {
    const s = some("Hello")

    assert(isSome(s))
    assertFalse(isNone(s))
  })

  await t.step("isNone()", () => {
    const n = none()

    assert(isNone(n))
    assertFalse(isSome(n))
  })

  await t.step("map()", () => {
    map(map(some("Hello"), (value) => value.toUpperCase()), (value) => {
      assertEquals(value, "HELLO")
    })

    map(some("Hello"), (value) => {
      assert(value, "unreachable")
    })
  })

  await t.step("bind()", () => {
    map(bind(some("Hello"), (value) => some(value.toUpperCase())), (value) => {
      assertEquals(value, "HELLO")
    })

    map(bind(some("Hello"), (_) => none()), (value) => {
      assertFalse(value, "unreachable")
    })
  })

  await t.step("defaultWith()", () => {
    assertEquals(defaultWith(some("Hello"), "Fallback"), "Hello")

    assertEquals(defaultWith(none(), "Fallback"), "Fallback")
  })

  await t.step("from()", () => {
    assert(isSome(from("Hello")))
    assert(isSome(from("")))
    assert(isSome(from(0)))
    assert(isNone(from(null)))
    assert(isNone(from(undefined)))
  })
})
