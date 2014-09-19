/*! sui v0.0.1 | https://github.com/classicemi/sui */
!(function () {

var __modules__ = {};

function require (id) {
    var mod = __modules__[id];
    var exports = 'exports';

    if (typeof mod === 'object') {
        return mod;
    }

    if (!mod[exports]) {
        mod[exports] = {};
        mod[exports] = mod.call(mod[exports], require, mod[exports], mod) || mod[exports];
    }

    return mod[exports];
}

function define (path, fn) {
    __modules__[path] = fn;
}



define("jquery", function () {
    return jQuery;
});

define("dialog", function(require) {

	// jquery
	var $ = require("jquery");

	console.log($);

});

window.SUI = require("dialog");

})();