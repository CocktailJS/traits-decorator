'use strict';

import { requires } from '../'

export default class TLast {
    
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