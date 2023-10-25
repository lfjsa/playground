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
