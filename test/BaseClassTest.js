/*jshint expr: true*/
'use strict';

// =======================================================================
// Test Setup
// =======================================================================
var expect = require('chai').expect,
	assert = require('chai').assert,
	sinon = require('sinon'),
	path = require('path'),
	events = require('events'),
	Promise = require('bluebird'),
	fse = Promise.promisifyAll(require('fs-extra'));

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

	describe('.paths', function(){

		it('should be an object containing methods', function(){
			var bc = new BaseClass();
			expect(bc.paths).to.be.an('object');
		});

		describe('#appRoot()', function(){

			it('should return the root path of the application', function(){
				var bc = new BaseClass(),
					result = path.resolve(process.cwd());

				expect(bc.paths.appRoot()).to.equal(result);
			});

			it('should throw an error if the app root does not exist', function(){
				var bc = new BaseClass(),
					filename = 'filename',
					errorMsg = 'Error: A valid application root could not be found.';

				try {
					bc.paths.appRoot(filename);
				} catch(err) {
					assert.equal(errorMsg, err);
				}
			});

		});

		describe('#srcPath()', function(){

			it('should return the source path of a template file', function(){
				var bc = new BaseClass(),
					filename = 'config.tpl.js',
					result = path.resolve(process.cwd() + '/src/templates/config.tpl.js');

				expect(bc.paths.srcPath(filename)).to.equal(result);
			});

			it('should throw an error if the source path does not exist', function(){
				var bc = new BaseClass(),
					filename = 'test',
					errorMsg = 'The requested file does not exist.';

				expect(bc.paths.srcPath.bind(bc.paths.srcPath, filename)).to.throw(errorMsg);
			});

		});

		describe('#destPath()', function(){

			it('should return the destination path for a template file', function(){
				var bc = new BaseClass(),
					moduleName = 'testModule',
					result = path.resolve(process.cwd() + '/modules/' + moduleName);

				expect(bc.paths.destPath(moduleName)).to.equal(result);
			});

		});

	});

});