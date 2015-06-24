'use strict';

import { mixins }  from '../'


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


@mixins(FooMixin, BarMixin)
class MyClass {

    constructor (collection: []) {
        this.collection = collection
    }
}

let obj = new MyClass([1,2,3])


obj.foo()  // foo from FooMixin
