export abstract class Option<T> {
  constructor(private _value: T) {}

  get value(): T | never {
    if (this.isSome()) {
      return this._value
    } else {
      throw new Error("fak")
    }
  }

  isSome(): this is Some<T> {
    return this instanceof Some
  }

  isNone(): this is None {
    return !this.isSome()
  }

  map<K>(mapper: (val: T) => K): Option<K> {
    if (this.isSome()) {
      return new Some(mapper(this._value))
    } else {
      return new None()
    }
  }

  bind<K>(binder: (val: T) => Option<K>): Option<K> {
    if (this.isSome()) {
      return binder(this._value)
    } else {
      return new None()
    }
  }

  default(val: T): Some<T> {
    if (this.isSome()) {
      return this
    } else {
      return new Some(val)
    }
  }
}

export class Some<T> extends Option<T> {
  constructor(value: T) {
    super(value)
  }
}

export class None extends Option<never> {
  constructor() {
    super(null!)
  }
}
