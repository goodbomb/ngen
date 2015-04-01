var path = require('path'),
	FileCreator = require('./FileCreator.js'),
	BaseClass = require('./BaseClass.js'),
	AppUtils = require('./AppUtils'),
	au = new AppUtils(),
	fse = require('fs-extra'),
	async = require('async'),
	FILEPATH = require('../lib/FILEPATH.js');


var fp = new FILEPATH(),
	moduleName = 'testModule',
	fileName = 'index.tpl.js',
	destDir = fp.appRoot + path.sep + moduleName + path.sep,
	dest = destDir + fileName;

au.generateTemplateFile('asdf', dest, moduleName);


var test = function (){
	
};
