# Option

Both `Promise` and `Option` wrap a value that is either present or absent.
Additionally, Promises do so for values that will resolve in the future. They
allow the manipulation of that value as if it were present using the `.then()`
method. Since chaining `.then()` can be cumbersome, `async` functions can unwrap
a Promise using the `await` keyword. Similarly, Options allow the manipulation
of its wrapped value using the `.bind()` and `.map()` methods.

While Promises and async/await exist in JS, Options and an equivalent unwrapping
mechanism do not. Here, I play with both.

## Why

Why not? Should it be used in a real codebase? Probably not. But it was fun to
build, and I have yet to find somebody else writing an option evaluator akin to
async/await in TS so here we are.

## Implementations

I implemented Options once using classes ([src](./option.ts)) and once using
functions ([src](./optionFn.ts)). Maybe it's my ignorance of classes, but the
latter felt more natural to implement and `type Option<T> = Some<T> | None` is
more explicit. Sadly, composing several `map` and `bind` functions with the
tools available is too Lisp-y for a TS codebase, the `|>` operator might never
be added to the language
([TC39 Proposal](https://github.com/tc39/proposal-pipeline-operator)), and
writing a `pipe` function is weird. Anyway, method chaining is more common in
this ecosystem. So the class-based implementation wins.

## Further reading

- [F# `Option` module](https://fsharp.github.io/fsharp-core-docs/reference/fsharp-core-optionmodule.html#bind)
- [`FS.Toolkit.ErrorHandling` Docs](https://demystifyfp.gitbook.io/fstoolkit-errorhandling/fstoolkit.errorhandling/option/ce)
- [Wrapper types for Fun and Profit](https://fsharpforfunandprofit.com/posts/computation-expressions-wrapper-types-part2/)
- [ES6 generators in depth](https://2ality.com/2015/03/es6-generators.html)
- [Coroutine Event Loops in Javascript](https://web.archive.org/web/20230405092038/https://x.st/javascript-coroutines/)
- [ACKSHUALLY, promises are not monads](https://stackoverflow.com/questions/45712106/why-are-promises-monads)
- [Redux Saga](https://github.com/redux-saga/redux-saga)
