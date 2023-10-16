import { None, Option, Some } from "./option.ts"

export function tryOrNone<T>(fn: () => T): Option<T> {
  try {
    return new Some(fn())
  } catch (_) {
    return new None()
  }
}

export function divide(a: number, b: number): Option<number> {
  if (b === 0) return new None()
  return new Some(a / b)
}
