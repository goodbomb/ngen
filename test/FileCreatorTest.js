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

		setTimeout(function(){
			done();
		}, 20);

	});

	//////////// Test 1 ////////////

	it('should be an instance of BaseClass', function(done){
		var fc = new FileCreator();
		expect(fc).to.be.instanceOf(BaseClass);
		done();
	});

	// describe('.createModule(name)', function(){

	// 	it('should throw an exception if a package.json file is not found in the diretory tree', function(done){
	// 		done();
	// 	});

	// });

});