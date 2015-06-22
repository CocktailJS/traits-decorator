'use strict';

import { traits, excludes, alias }  from '../'


const Mixin = {
    enumFoo() {
        console.log('foo from Mixin')
    }
}


@traits(Mixin)
class MyClass {

    constructor (collection: []) {
        this.collection = collection
    }
}

let obj = new MyClass([1,2,3])


obj.enumFoo()  // foo from Mixin
