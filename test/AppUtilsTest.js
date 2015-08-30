/*jshint expr: true*/
'use strict';

// =======================================================================
// Test Setup
// =======================================================================
var expect = require('chai').expect,
	assert = require('chai').assert,
	path = require('path'),
	events = require('events'),
	Promise = require('bluebird'),
	fse = Promise.promisifyAll(require('fs-extra'));

var AppUtils = require('../lib/AppUtils.js'),
	FILEPATH = require('../lib/FILEPATH.js');


// =======================================================================
// App Utilities Tests
// =======================================================================
describe('AppUtils', function() {

	describe('#getFileLocation()', function(){

		after(function(done){
			var file = 'testFile.txt';

			fse.exists(file, function(){
				fse.remove(file, function(err) {
					if (err) console.error(err);
				}, done());
			});
		});

		it('should return the nearest parent directory that has the requested file', function(done){
			var currentDir = process.cwd(),
				filename = 'testFile.txt';

			fse.writeFile(filename, 'Test File', function(err) {
				if (err) console.error(err);
				expect(AppUtils.getFileLocation(filename)).to.equal(currentDir);
			}, done());

		});

		it('should throw an error if the requested file does not exist', function() {
			var filename = 'does_not_exist',
				errorMsg = 'The requested file does not exist.';

			expect(AppUtils.getFileLocation.bind(AppUtils.getFileLocation, filename)).to.throw(errorMsg);
		});

	});

	describe('#capitaliseFirstLetter()', function() {

		it('should capitalise the first letter of a string', function(){
			var string = 'test';

			expect(AppUtils.capitaliseFirstLetter(string)).to.equal('Test');
		});

	});

	describe('#generateTemplateFile()', function() {

		var fp = new FILEPATH(),
			moduleName = 'testModule',
			fileName = 'index.tpl.js',
			src = fp.indexSrc,
			destDir = fp.appRoot + path.sep + moduleName + path.sep,
			dest = destDir + fileName;

		afterEach(function(done){

			fse.remove(destDir, function(err) {
				if (err) console.error(err);
			}, done());

		});

		it('should successfully copy a source file to its destination', function(done){
			var au = new AppUtils();

			au.on('destDir.created', function() {
				au.on('file.generated', function(){

					fse.exists(dest, function(exists){
						var fileCopied = exists ? true : false;
						expect(fileCopied).to.be.true;
					}, done());

				});

				au.generateTemplateFile(src, dest, moduleName);
			
			});

			fse.ensureDirAsync(destDir, function(err) {
				if (err) {
					return console.error(err);
				} else {
					au.emit('destDir.created');
				}
			});

		});

	});

});