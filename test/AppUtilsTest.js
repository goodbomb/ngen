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
			var au = new AppUtils(),
				currentDir = process.cwd(),
				filename = 'testFile.txt';

			fse.writeFile(filename, 'Test File', function(err) {
				if (err) console.error(err);
				expect(au.getFileLocation(filename)).to.equal(currentDir);
			}, done());

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