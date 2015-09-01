/*jshint expr: true*/

'use strict';

describe('{%CTRL_NAME%}Controller', function() {

    var ctrl, scope;

    beforeEach(angular.mock.module('{%APP_NAME%}'));

    beforeEach(function() {

        angular.mock.inject(function($controller, $rootScope) {
            scope = $rootScope.$new();
            ctrl = $controller('{%CTRL_NAME%}Ctrl', {
                $scope: scope
            });
        });

    });

    it('should exist', function() {
        expect(ctrl).to.not.be.undefined;
        expect(scope.test).to.be.null;
    });

});