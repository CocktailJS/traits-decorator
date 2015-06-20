'use strict';

import { traits, as }  from '../'

import TFirst from './TFirst'
import TLast  from './TLast'


@traits(TFirst, TLast::as({excludes:['foo', 'justAnother']}))
class TEnum {

    foo() {
        console.log('foooooo')
    }
}


@traits(TEnum)
class MyClass {

    constructor (collection: []) {
        this.collection = collection;
    }
}

let obj = new MyClass([1,2,3])

console.log(obj.first())
