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


@traits(TEnum::alias({ foo: 'enumFoo' }))
class MyClass {

    constructor (collection: []) {
        this.collection = collection
    }
}

let obj = new MyClass([1,2,3])

console.log(obj.first()) // 1

obj.enumFoo() // enum foo

