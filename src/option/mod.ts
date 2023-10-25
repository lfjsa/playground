import { Option, OptionExpression } from "./option.ts"
import { divide, tryOrNone } from "./utils.ts"

function division(a: number, b: number, c: number) {
  return Option.eval(function* (): OptionExpression<number> {
    const aa = yield divide(a, b)
    const bb = yield divide(aa, c)

    return bb
  })
}

// deno-lint-ignore no-explicit-any
function anystring(a: any, b: any) {
  return Option.eval(function* (): OptionExpression<string> {
    const aa = yield tryOrNone(() => a.toUpperCase())
    const bb = yield tryOrNone(() => b.toUpperCase())

    return `${aa} ${bb}`
  })
}

// deno-lint-ignore no-explicit-any
async function thenable(a: any, b: any) {
  const aa = await tryOrNone(() => a.toUpperCase())
  const bb = await tryOrNone(() => b.toUpperCase())

  return `${aa} ${bb}`
}

export function init() {
  console.log("Division: ", division(10, 0, 10))
  console.log("Division: ", division(10, 2, 2))
  console.log("Anystring: ", anystring(1, "Hello"))
  console.log("Anystring: ", anystring("Hello", "Bastard"))
  thenable("Hello", "Bastard").then((v) => console.log("Thenable: ", v))
  thenable(1, "Hello").then((v) => console.log("Thenable: ", v))
}
