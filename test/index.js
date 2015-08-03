'use strict';

import tap from 'tap';

import { traits, alias, excludes } from '../';

const Foo = { foo() {} };
const Bar = { bar() {} };

class TFoo { foo() {} }
class TBar { bar() {} }

tap.test('@traits should apply a single trait to a class', function(suite) {

    tap.test('trait as object', function(t) {
        @traits(Foo) class SUT {}

        t.equal(SUT.prototype.foo, Foo.foo, 'foo method should be applied to class');
        t.end();
    });

    tap.test('trait as class', function(t) {
        @traits(TFoo) class SUT {}

        t.equal(SUT.prototype.foo, TFoo.prototype.foo, 'foo method should be applied to class');
        t.end();
    });

    suite.end();
});

tap.test('@traits should apply multiple traits to a class', function(suite) {

    tap.test('traits as objects', function(t) {

        @traits(Foo, Bar) class SUT {}

        t.equal(SUT.prototype.foo, Foo.foo, 'foo method should be applied to class');
        t.equal(SUT.prototype.bar, Bar.bar, 'bar method should be applied to class');
        t.end();
    });

    tap.test('traits as classes', function(t) {

        @traits(TFoo, TBar) class SUT {}

        t.equal(SUT.prototype.foo, TFoo.prototype.foo, 'foo method should be applied to class');
        t.equal(SUT.prototype.bar, TBar.prototype.bar, 'bar method should be applied to class');
        t.end();
    });

    tap.test('traits mixed', function(t) {

        @traits(TFoo, Bar) class SUT {}

        t.equal(SUT.prototype.foo, TFoo.prototype.foo, 'foo method should be applied to class');
        t.equal(SUT.prototype.bar, Bar.bar, 'bar method should be applied to class');
        t.end();
    });

    suite.end();
});

tap.test('@traits should throw an error if there is state defined in trait', function(t) {
    const Invalid = { state: 1 };

    t.throws(function() {

        @traits(Invalid) class SUT {}
        t.notOk(SUT);

    }, 'state is not allowed in a Trait');

    t.end();
});

tap.test('@traits:conflicts', function(suite) {

    tap.test('@traits should throw an error if there is a name collision', function(t) {

        t.throws(function() {

            @traits(TFoo) class SUT {
                foo() {
                    console.log('class');
                }
            }

            t.notOk(SUT);
        }, 'name collision should be resolved');

        t.end();
    });

    tap.test('::alias - solve conflict by aliasing collision method', function(t) {
        @traits(TFoo::alias({foo: 'collisionFoo'}))
        class SUT {
            foo() {
                console.log('class');
            }
        }

        t.ok(SUT.prototype.collisionFoo, 'collisionFoo alias should be part of SUT');
        t.ok(SUT.prototype.foo, 'foo should be defined');

        t.end();
    });

    tap.test('::alias - with no parameters or empty object does nothing', function(t) {
        @traits(TFoo::alias(), TFoo::alias({}))
        class SUT {
            myFoo() {
                console.log('class');
            }
        }

        t.ok(SUT.prototype.foo, 'foo should be defined');
        t.ok(SUT.prototype.myFoo, 'myFoo should be defined');
        t.end();
    });

    tap.test('::excludes - solve conflict by excluding collision method', function(t) {
        @traits(TFoo::excludes('foo'))
        class SUT {
            foo() {
                console.log('class');
            }
        }

        t.ok(SUT.prototype.foo, 'foo should be defined');

        t.end();
    });

    suite.end();
});
