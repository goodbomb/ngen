module.exports = AppUtils;

// =======================================================================
// Module Setup
// =======================================================================
var events = require('events'),
	util = require('util'),
	fse = require('fs-extra'),
	path = require('path'),
	replaceStream = require('replacestream'),
	async = require('async');


// =======================================================================
// Module Logic
// =======================================================================

function AppUtils() {}

util.inherits(AppUtils, events.EventEmitter);

AppUtils.prototype.getFileLocation = function(filename) {
	var numDirs = path.resolve(filename).split('/');
	var dir = process.cwd();
	var fileLocation;

	for (var i=0; i < numDirs.length; i++) {

		var query = path.resolve(dir + '/' + filename);
		dir = path.resolve(dir.concat('/..'));

		if (fse.existsSync(query)) {
			fileLocation = path.resolve(query + '/..');
			break;
		}
	}

	if (!fileLocation) {
		throw new Error('The requested file does not exist.');
	} else {
		return fileLocation;
	}
};

AppUtils.prototype.capitaliseFirstLetter = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

AppUtils.prototype.generateTemplateFile = function(src, dest, moduleName) {
	var ee = this;
	var rf = fse.createReadStream(src);
	var wf = fse.createWriteStream(dest);

	rf.on('error', function(err) {
		done(err);
	});

	wf.on('error', function(err) {
		done(err);
	});

	wf.on('close', function(ex) {
		done();
	});

	rf.pipe(replaceStream('{%MODULENAME%}', moduleName))
	.pipe(wf);

	function done(err) {
		if (err) {
			return console.error(err);
		} else {
			ee.emit('file.created');
		}
	}
};