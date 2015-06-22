'use strict';

import { requires } from '../'


export default class TFirst {

    @requires('collection:[]')
    first() {
        return this.collection[0];
    }

}
