export type OptionExpression<T> = Generator<Option<T> | T, Option<T> | T, T>

export abstract class Option<T> {
  constructor(protected _value: T) {}

  isSome(): this is Some<T> {
    return this instanceof Some
  }

  isNone(): this is None {
    return !this.isSome()
  }

  map<K>(mapper: (value: T) => K): Option<K> {
    return this.isSome() ? new Some(mapper(this._value)) : new None()
  }

  bind<K>(binder: (value: T) => Option<K>): Option<K> {
    return this.isSome() ? binder(this._value) : new None()
  }

  then<K>(thenner: (value: T) => K | Option<K>): Option<K> {
    if (this.isSome()) {
      const result = thenner(this._value)
      return result instanceof Option ? result : new Some(result)
    } else {
      return new None()
    }
  }

  defaultWith(value: T): T {
    return this.isSome() ? this.value : value
  }

  static from<T>(value: T): Option<T> {
    return value == undefined ? new None() : new Some(value)
  }

  static eval<T>(expression: () => OptionExpression<T>): Option<T> {
    const iterable = expression()
    let { value, done } = iterable.next()

    while (!done) {
      if (!(value instanceof Option)) {
        const r = iterable.next(value)
        value = r.value
        done = r.done
      } else if (value.isSome()) {
        const r = iterable.next(value.value)
        value = r.value
        done = r.done
      } else {
        iterable.return(new None())
        done = true
      }
    }

    return value instanceof Option ? value : new Some(value)
  }
}

export class Some<T> extends Option<T> {
  constructor(value: T) {
    super(value)
  }

  get value(): T {
    return this._value
  }
}

export class None extends Option<never> {
  constructor() {
    super(null!)
  }
}
