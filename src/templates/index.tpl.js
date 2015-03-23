'use strict';

module.exports = angular.module('module.name', [])
	.config(require('./{%MODULENAME%}Config'))
	.directive('{%MODULENAME%}View', require('./{%MODULENAME%}Directive'))
	.controller('{%MODULENAME%}Ctrl', require('./{%MODULENAME%}Controller'));