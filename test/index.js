'use strict'

import tap from 'tap'

import { traits } from '../'

const Foo = {
    foo() {}
}

const Bar = {
    bar() {}
}

tap.test('@traits should apply a single trait to a class', function(t) {

    @traits(Foo) class SUT {}

    t.equal(SUT.prototype.foo, Foo.foo, 'foo method should be applied to class')
    t.end()
})

tap.test('@traits should apply multiple traits to a class', function(t) {

    @traits(Foo, Bar) class SUT {}

    t.equal(SUT.prototype.foo, Foo.foo, 'foo method should be applied to class')
    t.equal(SUT.prototype.bar, Bar.bar, 'bar method should be applied to class')
    t.end()
})
