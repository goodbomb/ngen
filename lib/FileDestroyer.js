module.exports = FileDestroyer;

// =======================================================================
// Module Setup
// =======================================================================
var util = require('util'),
	fse = require('fs-extra'),
	path = require('path'),
	BaseClass = require('./BaseClass.js'),
	FILEPATH = require('../lib/FILEPATH.js'),
	fp = new FILEPATH();


// =======================================================================
// Module Logic
// =======================================================================

function FileDestroyer() {}

util.inherits(FileDestroyer, BaseClass);

FileDestroyer.prototype.destroyModule = function(name) {
	var self = this,
		targetModule = fp.appRoot + path.sep + 'modules' + path.sep + name;

	// this.on('module.destroyed', function(){
	// 	console.log('Module "' + name + '" destroyed.');
	// });

	fse.remove(targetModule, function(err) {
		if (err) {
			console.error(err);
		} else if (fse.exists(targetModule) === false) {
			throw new Error('That module name does not exist.');
		} else {
			self.emit('module.destroyed');
		}
	});
};

FileDestroyer.prototype.cancelAction = function() {
	return 'Action Cancelled';
};