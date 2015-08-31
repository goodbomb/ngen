/*jshint expr: true*/
'use strict';

process.env.NODE_ENV = 'test';

// =======================================================================
// Test Setup
// =======================================================================
var expect = require('chai').expect,
	path = require('path'),
	fse = require('fs-extra');

var BaseClass = require('../lib/BaseClass.js'),
	FileCreator = require('../lib/FileCreator.js');


// =======================================================================
// Create Files Tests
// =======================================================================
describe('FileCreator', function() {

	var appRoot, libDir, modDir, moduleName;

	before(function() {
		appRoot = process.env.PWD,
		libDir = appRoot + path.sep + 'lib' + path.sep,
		modDir = appRoot + path.sep + 'modules' + path.sep,
		moduleName = 'testModuleC';
	});

	afterEach(function(done){
		fse.remove(modDir, function() {
			done();
		});
	});

	//////////// Test 1 ////////////

	it('should be an instance of BaseClass', function(done){
		var fc = new FileCreator();
		expect(fc).to.be.instanceOf(BaseClass);
		done();
	});

	describe('#createModule(name)', function(){

		it('should create a root "modules" directory if one does not already exist', function(done){
			var fc = new FileCreator();

			fc.on('module.root.created', function(){
				fse.exists(modDir, function(exists) {
					var moduleRootExists = exists ? true : false;
					expect(moduleRootExists).to.be.true;
					done();
				});
			});

			fc.createModule(moduleName);
		});

		it('should create a module folder with its name passed in as an argument', function(done){
			var fc = new FileCreator();

			fc.on('module.created', function(){
				fse.exists(modDir + moduleName, function(exists) {
					var moduleExists = exists ? true : false;
					expect(moduleExists).to.be.true;
					done();
				});
			});

			fc.createModule(moduleName);
		});

		it('should emit a "module.created" message when the module folder is created', function(done){
			var fc = new FileCreator(),
				emitterTriggered = false;

			function callback() {
				expect(emitterTriggered).to.be.true;
			}

			fc.on('module.created', function(){
				emitterTriggered = true;
				done();
			}, callback);

			fc.createModule(moduleName);
		});

	});

});