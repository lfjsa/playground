import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts"

const test = z.object({
  one: z.string(),
  two: z.coerce.number(),
})

export function init() {
  const a = test.parse({ one: "herro", two: "10" })
  const b = test.parse({ one: "herro", two: "sup" })
  const c = test.parse({ one: "herro", two: [] })

  console.log({ a, b, c })
}
