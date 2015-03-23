// =======================================================================
// Test Setup
// =======================================================================
var expect = require('chai').expect,
	assert = require('chai').assert,
	path = require('path'),
	events = require('events'),
	Promise = require('bluebird'),
	fse = Promise.promisifyAll(require('fs-extra'));

var AppUtils = require('../lib/AppUtils.js');


// =======================================================================
// App Utilities Tests
// =======================================================================
describe('AppUtils', function() {

	describe('#getFileLocation()', function(){

		it('should return the nearest parent directory that has the requested file', function(){
			var au = new AppUtils(),
				currentDir = process.cwd(),
				filename = 'testFile.txt';

			// Create test file
			fse.writeFile(filename, 'Test File', function(err) {
				if(err) {console.error(err);}
			});

			// Run test
			expect(au.getFileLocation(filename)).to.equal(currentDir);

			// Delete test file
			fse.delete(filename, function(err) {
				if(err) {console.error(err);}
			});
		});

		it('should throw an error if the requested file does not exist', function() {
			var au = new AppUtils(),
				filename = 'does_not_exist',
				errorMsg = 'The requested file does not exist.';

			expect(au.getFileLocation.bind(au.getFileLocation, filename)).to.throw(errorMsg);
		});

	});

	describe('#capitaliseFirstLetter()', function() {

		it('should capitalise the first letter of a string', function(){
			var au = new AppUtils(),
				string = 'test';

				expect(au.capitaliseFirstLetter(string)).to.equal('Test');
		});

	});

});