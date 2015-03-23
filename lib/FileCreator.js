module.exports = FileCreator;

// =======================================================================
// Module Setup
// =======================================================================
var util = require('util'),
	BaseClass = require('./BaseClass.js'),
	AppUtils = require('./AppUtils'),
	au = new AppUtils();


// =======================================================================
// Module Logic
// =======================================================================

function FileCreator() {}

util.inherits(FileCreator, BaseClass);

FileCreator.prototype.createModule = function(name) {
	
}