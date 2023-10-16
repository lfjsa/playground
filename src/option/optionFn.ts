export type Some<T> = {
  _type: "Some"
  value: T
}

export type None = {
  _type: "None"
}

export type Option<T> = Some<T> | None

export function some<T>(value: T): Some<T> {
  return { _type: "Some", value }
}

export function none(): None {
  return { _type: "None" }
}

export function isSome<T>(option: Option<T>): option is Some<T> {
  return option._type === "Some"
}

export function isNone<T>(option: Option<T>): option is None {
  return option._type === "None"
}

export function map<T, K>(
  option: Option<T>,
  mapper: (value: T) => K,
): Option<K> {
  return isSome(option) ? some(mapper(option.value)) : none()
}

export function bind<T, K>(
  option: Option<T>,
  binder: (value: T) => Option<K>,
): Option<K> {
  return isSome(option) ? binder(option.value) : none()
}

export function defaultWith<T>(option: Option<T>, value: T): T {
  return isSome(option) ? option.value : value
}

export function from<T>(value: T): Option<T> {
  return value == null ? none() : some(value)
}
