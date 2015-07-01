# cocktail.next

## Introduction
Experimental library to apply Traits with ES7 decorators.

## API

## Decorators

###@traits(Trait1, ...TraitN)
Applicable to `class` definition. It will apply all the given Traits to the class.

```js
@traits(TExample) class MyClass {}
```

###@requires(description1, ...descriptionN)
Applicable to a method defined in a Trait. The decorator **does nothing** but it serves as a documentation to reflect what method / property the method needs access to.

```js
class TFoo {

    @requires('bar: {String}')
    fooBar() {
        console.log('foo,' + this.bar);
    }
}
```

###@mixins(Mixin1, ...MixinN)
Applicable to `class` definition. It will apply all the given Mixins Objects to the class using Object.assign

```js
@mixins(MixinOne, MixinTwo) class MyClass {}
```

## Bindings

###excludes(Method1, ...MethodN)
Applicable to Trait definition in '@traits'. It will exclude the given method names from the Trait.

```js
@traits(TExample::excludes('foo', 'bar')) 
class MyClass {}
```

###alias(aliases: {})
Applicable to Trait definition in '@traits'. It will alias the method defined in the Trait with the `key` as the `value` .

```js
@traits(TExample::alias({baz: 'parentBaz'}))
class MyClass {}
```

###as({alias: {}, excludes: []})
Applicable to Trait definition in '@traits'. It will apply aliases and excluded methods from the Trait

```js
@traits( TExample:as({alias: {baz: 'parentBaz'}, excludes:['foo', 'bar'] }) )
class MyClass {}
```



## Example
The `examples/index.js` file showcases the usage. 

Basically, we have a few Traits (classes) TFirst, TLast and we combine and apply them by using `traits` decorator:

>examples/index.js

```js
'use strict';

import { traits, excludes, alias }  from '../'

import TFirst from './TFirst'
import TLast  from './TLast'


@traits( TFirst, TLast::excludes('foo', 'justAnother') )
class TEnum {

    foo() {
        console.log('enum foo')
    }
}


@traits(TEnum::alias({ foo: 'enumFoo' }) )
class MyClass {

    constructor (collection: []) {
        this.collection = collection
    }
}

let obj = new MyClass([1,2,3])

console.log(obj.first()) // 1

obj.enumFoo() // enum foo

```


## Running the examples

In order to run the examples we need babel and since we are using some experimental functionality, decorators (@traits) and bindOperator (::) we need to use the `--stage 0` parameter which is defined in `.babelrc` file.

Run `npm install` first. Then:

> examples/index.js

```
npm run babel -- examples/index.js
```

> examples/mixins.js

```
npm run babel -- examples/mixins.js
```
 

## Install
If you want to use this module you can install it using **npm** and git until it is released on npm:

```
npm i -S git://github.com/cocktailjs/cocktail.next
```
