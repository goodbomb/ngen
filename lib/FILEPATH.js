'use strict';

// =======================================================================
// Module Setup
// =======================================================================
var path = require('path'),
	AppUtils = require('./AppUtils.js'),
	BaseClass = require('./BaseClass.js');


// =======================================================================
// Module Logic
// =======================================================================

class FILEPATH {

    constructor(fileName) {
        this.fileName = fileName;

        this.appRoot = BaseClass.getAppRoot();
        // this.templatePath = appRoot + path.sep + 'src' + path.sep + 'templates' + path.sep;
        // this.fileDest = appRoot + path.sep + 'modules' + path.sep + fileName + path.sep;


        // return {
        //     appRoot: appRoot,
        //     moduleDest: appRoot + path.sep + 'modules' + path.sep + fileName,
        //     indexSrc: templatePath + 'index.tpl.js',
        //     indexDest: fileDest + 'index.js',
        //     configSrc: templatePath + 'config.tpl.js',
        //     configDest: fileDest + fileName + 'Config.js',
        //     ctrlSrc: templatePath + 'controller.tpl.js',
        //     ctrlDest: fileDest + AppUtils.capitaliseFirstLetter(fileName) + 'Controller.js',
        //     ctrlSpecSrc: templatePath + 'controller.spec.tpl.js',
        //     ctrlSpecDest: fileDest + AppUtils.capitaliseFirstLetter(fileName) + 'Controller.spec.js',
        //     directiveSrc: templatePath + 'directive.tpl.js',
        //     directiveDest: fileDest + fileName + 'Directive.js',
        //     stylesSrc: templatePath + 'styles.tpl.less',
        //     stylesDest: fileDest + fileName + '.less',
        //     htmlSrc: templatePath + 'template.tpl.html',
        //     htmlDest: fileDest + fileName + '.html'
        // };
    }

    get appRoot() {
        return appRoot;
    }
}
/*var FILEPATH = function(fileName) {
	var appRoot = BaseClass.getAppRoot(),
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
		ctrlDest: fileDest + AppUtils.capitaliseFirstLetter(fileName) + 'Controller.js',
        ctrlSpecSrc: templatePath + 'controller.spec.tpl.js',
        ctrlSpecDest: fileDest + AppUtils.capitaliseFirstLetter(fileName) + 'Controller.spec.js',
		directiveSrc: templatePath + 'directive.tpl.js',
		directiveDest: fileDest + fileName + 'Directive.js',
		stylesSrc: templatePath + 'styles.tpl.less',
		stylesDest: fileDest + fileName + '.less',
		htmlSrc: templatePath + 'template.tpl.html',
		htmlDest: fileDest + fileName + '.html'
	};
};*/

module.exports = FILEPATH;