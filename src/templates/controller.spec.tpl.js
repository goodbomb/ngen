/*jshint expr: true*/

'use strict';

describe('{%MODULENAME%}Controller', function() {

    var ctrl, scope;

    beforeEach(angular.mock.module('{%APP_NAME%}'));

    beforeEach(function() {

        angular.mock.inject(function($controller, $rootScope) {
            scope = $rootScope.$new();
            ctrl = $controller('{%MODULENAME%}Ctrl', {
                $scope: scope
            });
        });

    });

    it('should exist', function() {
        expect(ctrl).to.not.be.undefined;
        expect(scope.test).to.be.null;
    });

});