'use strict';

import { traits, excludes, alias }  from '../'


const FooMixin = {
    foo() {
        console.log('foo from FooMixin')
    }
}


const BarMixin  = {
    bar() {
        console.log('bar')
    },

    foo() {
        console.log('foo from BarMixin')
    }
}


@traits(FooMixin, BarMixin::excludes('foo'))
class MyClass {

    constructor (collection: []) {
        this.collection = collection
    }
}

let obj = new MyClass([1,2,3])


obj.foo()  // foo from FooMixin
