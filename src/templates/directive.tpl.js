'use strict';

module.exports = function directive() {
	return {
		controller: '{%CTRL_NAME%}Ctrl',
		template: require('./{%MODULENAME%}.html'),
		restrict: 'A',
		transclude: true,
		scope: true
	};
};