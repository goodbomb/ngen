/*jshint expr: true*/
'use strict';

process.env.NODE_ENV = 'test';

// =======================================================================
// Test Setup
// =======================================================================
var expect = require('chai').expect,
	path = require('path'),
	Promise = require('bluebird'),
	fse = Promise.promisifyAll(require('fs-extra'));

var BaseClass = require('../lib/BaseClass.js'),
	FileCreator = require('../lib/FileCreator.js'),
	FileDestroyer = require('../lib/FileDestroyer.js');


// =======================================================================
// Destroy Files Tests
// =======================================================================
describe('FileDestroyer', function() {

	var appRoot, libDir, modDir, moduleName;

	before(function() {
		appRoot = process.env.PWD,
		libDir = appRoot + path.sep + 'lib' + path.sep,
		modDir = appRoot + path.sep + 'modules' + path.sep,
		moduleName = 'testModuleD';
	});

	beforeEach(function(){
		var fc = new FileCreator();
		fc.createModule(moduleName);
	});

	afterEach(function(done){
		fse.remove(modDir, function() {
			done();
		});
	});

	//////////// Test 1 ////////////

	it('should be an instance of BaseClass', function(done){
		var fd = new FileDestroyer();
		expect(fd).to.be.instanceOf(BaseClass);
		done();
	});


	describe('#destroyModule(name)', function(){

		it('should destroy a module (by name) and all of its files', function(done){
			var fd = new FileDestroyer();

			fd.on('module.destroyed', function(){

				fse.exists(modDir + moduleName, function(exists) {
					var moduleExists = exists ? true : false;
					expect(moduleExists).to.be.false;
				}, done());

			});

			fd.destroyModule(moduleName);
		});

        it('should emit a "module.destroyed" message when the module folder is destroyed', function(done){
            var fd = new FileDestroyer(),
                emitterTriggered = false;

            function callback() {
                expect(emitterTriggered).to.be.true;
            }

            fd.on('module.destroyed', function(){
                emitterTriggered = true;
                done();
            }, callback);

            fd.destroyModule(moduleName);
        });

	});

});