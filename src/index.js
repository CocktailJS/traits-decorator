
'use strict';

const _REF_ = Symbol();

function _filterKeys(key) {
    return !key.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/);
}

function _applyMethod(method, traitProto, subject, aliases, excluded) {
    _applyIfNotExcluded(method, traitProto, subject, aliases, excluded);
    
}

function _raiseErrorIfConflict(methodName, traitProto, subjectProto) {
    let 
        // requiredMethodName = Requires.requiredMethod.name,
        subjectMethod = subjectProto[methodName],
        traitMethod = traitProto[methodName],
        sameMethodName = (subjectMethod && traitMethod),
        methodsAreNotTheSame = sameMethodName && (subjectMethod.toString() !== traitMethod.toString());
        // traitMethodIsNotARequired = sameMethodName && (traitMethod.name !== requiredMethodName),
        // subjecMethodIsNotARequired = sameMethodName && (subjectMethod.name !== requiredMethodName);


    if (
        sameMethodName && methodsAreNotTheSame 
        // && traitMethodIsNotARequired && subjecMethodIsNotARequired
    ) {
        throw new Error('Method named: ' + methodName + ' is defined twice.' );
    }
}


function _applyIfNotExcluded(method, traitProto, subject, aliases, excluded) {

    if (excluded.indexOf(method) === -1) {
       
        let alias = aliases[method] || method;
       
        _raiseErrorIfConflict(alias, traitProto, subject);
       
        if (!subject[alias] || subject[alias] === Requires.requiredMethod) {
            Object.defineProperty(subject, alias, Object.getOwnPropertyDescriptor(traitProto, method));
        }
    }
    
}

// trait or trait descriptor

function traitReference() {
    return this[_REF_] || this;
}

function fromAliases() {
    return this.alias || {};
}

function fromExcludes() {
    return this.excludes || []
}
// --


function _apply(t) {
    let subject = this;
    let aliases = t::fromAliases();
    let excluded = t::fromExcludes();
    let trait = t::traitReference();
    let tp = trait.prototype || t;

    Object.getOwnPropertyNames(tp)
        .filter(_filterKeys)
        .forEach(function(method) {        
            _applyMethod(method, tp, subject, aliases, excluded);
        })
}

function addTrait(t) {
    let subject = this.prototype;
    subject::_apply(t);
}

function asDescriptor() {
    return (this.prototype || !this[_REF_] ? {[_REF_]: this} : this);
}


// decorators

/**
 * @decorator traits
 * @params Trait1, ...TraitN
 * @usage
 *    
 *    @traits(TExample) class MyClass {}
 *    
 */
export function traits(...traitList) {

    return function (target) {
        traitList.forEach(function(trait){
            target::addTrait(trait)
        });
    }
}


// bindings

export function excludes(...excludes) {
    let descriptor = this::asDescriptor();

    descriptor.excludes = excludes;

    return descriptor;
}

export function alias(aliases: {}) {
    let descriptor = this::asDescriptor();

    descriptor.alias = aliases;

    return descriptor;
}

export function as(options: {alias: {}, excludes: []}) {
    let descriptor = this::asDescriptor();

    descriptor
        ::alias(options.alias)
        ::excludes(...options.excludes);

    return descriptor;
}



