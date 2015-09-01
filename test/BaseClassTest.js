/*jshint expr: true*/
'use strict';

process.env.NODE_ENV = 'test';

// =======================================================================
// Test Setup
// =======================================================================
var expect = require('chai').expect,
	assert = require('chai').assert,
	path = require('path'),
	events = require('events');

var BaseClass = require('../lib/BaseClass.js');


// =======================================================================
// Base Class Tests
// =======================================================================
describe('BaseClass', function() {

	//////////// Test 1 ////////////

	it('should be an instance of EventEmitter', function(done){
		var bc = new BaseClass();
		expect(bc).to.be.instanceOf(events.EventEmitter);
		done();
	});

	describe('#getAppRoot()', function(){

		it('should return the root path of the application', function(){
			var result = path.resolve(process.cwd());

			expect(BaseClass.getAppRoot()).to.equal(result);
		});

		it('should throw an error if the app root does not exist', function(){
			var filename = 'filename',
				errorMsg = 'Error: A valid application root could not be found.';

			try {
				BaseClass.getAppRoot(filename);
			} catch(err) {
				assert.equal(errorMsg, err);
			}
		});

	});

	describe('#getSrcPath()', function(){

		it('should return the source path of a template file', function(){
			var filename = 'index.tpl.js',
				result = path.resolve(process.cwd() + '/src/templates/index.tpl.js');

			expect(BaseClass.getSrcPath(filename)).to.equal(result);
		});

		it('should throw an error if the source path does not exist', function(){
			var filename = 'test',
				errorMsg = 'The requested file does not exist.';

			expect(BaseClass.getSrcPath.bind(BaseClass.getSrcPath, filename)).to.throw(errorMsg);
		});

	});

	describe('#setDestPath()', function(){

		it('should return the destination path for a template file', function(){
			var moduleName = 'testModule',
				result = path.resolve(process.cwd() + '/modules/' + moduleName);

			expect(BaseClass.setDestPath(moduleName)).to.equal(result);
		});

	});

});