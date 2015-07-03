# traits-decorator

[![npm version](https://badge.fury.io/js/traits-decorator.svg)](http://badge.fury.io/js/traits-decorator)

Experimental library to apply Traits with ES7 decorators.

## Install

> using npm

```
npm i -S traits-decorator
```


> using git repository
 
```
npm i -S git://github.com/cocktailjs/traits-decorator
```

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

## Bindings

### excludes(Method1, ...MethodN)
Applicable to Trait definition in '@traits'. It will exclude the given method names from the Trait.

```js
@traits(TExample::excludes('foo', 'bar')) 
class MyClass {}
```

### alias(aliases: {})
Applicable to Trait definition in '@traits'. It will alias the method defined in the Trait with the `key` as the `value` .

```js
@traits(TExample::alias({baz: 'parentBaz'}))
class MyClass {}
```

### as({alias: {}, excludes: []})
Applicable to Trait definition in '@traits'. It will apply aliases and excluded methods from the Trait

```js
@traits( TExample:as({alias: {baz: 'parentBaz'}, excludes:['foo', 'bar'] }) )
class MyClass {}
```


## Usage
Basically, we have a few Traits (classes) TFirst, TLast and we combine and apply them by using `traits` decorator:

>example.js

```js
'use strict';

import { traits, excludes, alias, requires }  from 'traits-decorator'

class TFirst {

    @requires('collection:[]')
    first() {
        return this.collection[0];
    }

}

class TLast {
    
    @requires('collection:[]')
    last() {
        let collection = this.collection;
        let l = collection.length;
        return collection[l-1];
    }

    justAnother() {}

    foo() {
        console.log('from TLast\'s foo');
    }
}

//composing a Trait with others
@traits( TFirst, TLast::excludes('foo', 'justAnother') )
class TEnum {

    foo() {
        console.log('enum foo')
    }
}

//apply trait TEnum
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


In order to run the `example.js` we need babel and since we are using some experimental functionality, decorators (@traits) and bindOperator (::) we need to use the `--stage 0`.


```
babel-node --stage 0 example.js
```


## Update
@mixins decorator has been removed. If you want to use `mixins` please use [mixins-decorator](https://www.npmjs.com/package/mixins-decorator) package.
