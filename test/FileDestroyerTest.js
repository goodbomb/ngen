// =======================================================================
// Test Setup
// =======================================================================
var expect = require('chai').expect,
	assert = require('chai').assert,
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

		// it('should return a "Module (Name) destroyed" message when successful', function(){
		// 	var fd = new FileDestroyer();

		// 	fd.destroyModule(moduleName);

		// });

	});

});