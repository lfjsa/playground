import { None, Option, Some } from "./option.ts"

export function tryOrNone<T>(fn: () => T): Option<T> {
  try {
    return new Some(fn())
  } catch (_) {
    return new None()
  }
}
