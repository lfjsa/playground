import { assert, assertEquals } from "std/assert/mod.ts"
import { tryOrNone } from "./utils.ts"

Deno.test("tryOrNone()", async (t) => {
  await t.step("success", () => {
    const result = tryOrNone(() => "Noice")

    assertEquals(result.value, "Noice")
  })

  await t.step("fail", () => {
    const result = tryOrNone(() => {
      throw new Error("I know, this should be a result type instead")
    })

    assert(result.isNone())
  })
})
