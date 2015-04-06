'use strict';

// =======================================================================
// Module Setup
// =======================================================================
var path = require('path'),
	AppUtils = require('./AppUtils.js'),
	au = new AppUtils(),
	BaseClass = require('./BaseClass.js');


// =======================================================================
// Module Logic
// =======================================================================

function FILEPATH(fileName) {
	var appRoot = BaseClass.prototype.paths.appRoot(),
		templatePath = appRoot + path.sep + 'src' + path.sep + 'templates' + path.sep,
		fileDest = appRoot + path.sep + 'modules' + path.sep + fileName + path.sep;

	return {
		appRoot: appRoot,
		moduleDest: appRoot + path.sep + 'modules' + path.sep + fileName,
		indexSrc: templatePath + 'index.tpl.js',
		indexDest: fileDest + 'index.js',
		configSrc: templatePath + 'config.tpl.js',
		configDest: fileDest + fileName + 'Config.js',
		ctrlSrc: templatePath + 'controller.tpl.js',
		ctrlDest: fileDest + au.capitaliseFirstLetter(fileName) + 'Controller.js',
		directiveSrc: templatePath + 'directive.tpl.js',
		directiveDest: fileDest + fileName + 'Directive.js',
		stylesSrc: templatePath + 'styles.tpl.less',
		stylesDest: fileDest + fileName + '.less',
		htmlSrc: templatePath + 'template.tpl.html',
		htmlDest: fileDest + fileName + '.html'
	};
}

module.exports = FILEPATH;