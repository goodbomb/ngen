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

	beforeEach(function(done){
		done();
	});

	//////////// Test 1 ////////////

	it('should be an instance of BaseClass', function(done){
		var fd = new FileDestroyer();
		expect(fd).to.be.instanceOf(BaseClass);
		done();
	});


	describe('.destroyModule(name)', function(){

		

	});

});