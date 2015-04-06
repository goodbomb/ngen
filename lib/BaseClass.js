'use strict';

// =======================================================================
// Module Setup
// =======================================================================
var Promise = require('bluebird'),
	events = require('events'),
	util = require('util'),
	path = require('path'),
	fse = Promise.promisifyAll(require('fs-extra')),
	AppUtils = require('./AppUtils'),
	au = new AppUtils();


// =======================================================================
// Module Logic
// =======================================================================

function BaseClass() {}

util.inherits(BaseClass, events.EventEmitter);

BaseClass.prototype.paths = {
	appRoot: function(filename) {
		var rootPath;

		if (!filename) {
			rootPath = au.getFileLocation('package.json');
		} else {
			try {
				rootPath = au.getFileLocation(filename);
			} catch(err) {
				throw new Error('A valid application root could not be found.');
			}
		}

		return rootPath;
	},
    srcPath: function(filename) {
		var appRoot = BaseClass.prototype.paths.appRoot();
		var filePath = appRoot + path.sep + 'src' + path.sep + 'templates' + path.sep + filename;
		if (fse.existsSync(filePath)) {
			return filePath;
		} else {
			throw new Error('The requested file does not exist.');
		}
    },
    destPath: function(filename) {
		var appRoot = BaseClass.prototype.paths.appRoot();
		var fileDest = appRoot + path.sep + 'modules' + path.sep + filename;
		
		return fileDest;
    }
};

BaseClass.prototype.filePaths = function(fileName) {
	this.appRoot = au.getFileLocation('package.json');
};

module.exports = BaseClass;