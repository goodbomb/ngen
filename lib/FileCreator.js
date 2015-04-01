module.exports = FileCreator;

// =======================================================================
// Module Setup
// =======================================================================
var util = require('util'),
	path = require('path'),
	Promise = require('bluebird'),
	fse = Promise.promisifyAll(require('fs-extra')),
	BaseClass = require('./BaseClass.js'),
	AppUtils = require('./AppUtils'),
	au = new AppUtils();


// =======================================================================
// Module Logic
// =======================================================================

function FileCreator() {}

util.inherits(FileCreator, BaseClass);

FileCreator.prototype.createModule = function(name) {
	var self = this,
		modulesDir = this.paths.appRoot() + path.sep + 'modules';

	if (fse.exists(modulesDir)) {
		self.emit('module.root.exists');
		createModuleDirectory();
	} else {
		fse.ensureDirAsync(modulesDir, function(err) {
			if (err) {
				return console.error(err);
			} else {
				self.emit('module.root.created');
			}
		}).then(createModuleDirectory());
	}

	function createModuleDirectory() {
		fse.ensureDirAsync(modulesDir + path.sep + name, function(err) {
			if (err) {
				return console.error(err);
			} else {
				self.emit('module.created');
			}
		});
	}
};

// fc = new FileCreator();
// fc.on('module.created', function(){
// 	console.log('it works!');
// });
// fc.createModule('Blah');