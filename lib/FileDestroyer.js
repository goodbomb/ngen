module.exports = FileDestroyer;

// =======================================================================
// Module Setup
// =======================================================================
var util = require('util'),
	BaseClass = require('./BaseClass.js');


// =======================================================================
// Module Logic
// =======================================================================

function FileDestroyer() {}

util.inherits(FileDestroyer, BaseClass);

FileDestroyer.prototype.destroyModule = function(name) {

}