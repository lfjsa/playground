import { assert, assertEquals, assertFalse } from "std/assert/mod.ts"
import { divide, tryOrNone } from "./utils.ts"

Deno.test("tryOrNone()", async (t) => {
  await t.step("success", () => {
    const result = tryOrNone(() => "Noice")

    if (result.isSome()) {
      assertEquals(result.value, "Noice")
    } else {
      assertFalse(true, "unreachable")
    }
  })

  await t.step("fail", () => {
    const result = tryOrNone(() => {
      throw new Error("I know, this should be a result type instead")
    })

    assert(result.isNone())
  })
})

Deno.test("divide", () => {
  divide(4, 2).map((v) => {
    assertEquals(v, 2)
  })

  const none = divide(4, 0)
  assert(none.isNone())
})
