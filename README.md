# cocktail.next

## Introduction
Playing with Traits and decorators

## Example
The `index.js` file showcases the usage. 

Basically, we have a few Traits (classes) TFirst, TLast and we combine and apply them by using `traits` decorator:

```
'use strict';

import { traits, as }  from '../'

import TFirst from './TFirst'
import TLast  from './TLast'

@traits(TFirst, TLast::as({excludes:['foo', 'justAnother']}))
class MyClass {

    constructor (collection: []) {
        this.collection = collection;
    }
}

let obj = new MyClass([1,2,3,4,5]);


console.log(obj.first()); // 1
console.log(obj.last());  // 5

```


## Running the examples

In order to run the examples we need babel and since we are using some functionality like decorators (like @traits) and bindOperator (::) we need to use the `--stage 0` paramenter.


```js
babel-node --stage 0 examples/index.js
```

