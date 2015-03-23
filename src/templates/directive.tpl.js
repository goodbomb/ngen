'use strict';

module.exports = function directive() {
	return {
		controller: '{%MODULENAME%}Ctrl',
		template: require('./{%MODULENAME%}.html'),
		restrict: 'A',
		transclude: true,
		scope: true
	};
};