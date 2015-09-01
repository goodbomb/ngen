'use strict';

// =======================================================================
// Module Setup
// =======================================================================
var path = require('path'),
	Promise = require('bluebird'),
	fse = Promise.promisifyAll(require('fs-extra')),
	BaseClass = require('./BaseClass'),
	AppUtils = require('./AppUtils'),
	au = new AppUtils();


// =======================================================================
// Module Logic
// =======================================================================

class FileCreator extends BaseClass {

    /**
     * Creates a full module with boilerplate files.
     * 
     * @param  {string} name - The name of the module to generate.
     */
    createModule(name) {
        var fp = new require('./FILEPATH')(name);

        var self = this,
            modulesDir = BaseClass.getAppRoot() + path.sep + 'modules',
            newModulePath = modulesDir + path.sep + name + path.sep;

        self.on('module.created', function(){
            AppUtils.log('Module "' + newModulePath + '" created.');
        });

        if (fse.exists(modulesDir)) {
            self.emit('module.root.exists');
            createModule();
        } else {
            fse.ensureDirAsync(modulesDir, function(err) {
                if (err) {
                    return console.error(err);
                } else {
                    self.emit('module.root.created');
                }
            })
            .then(createModule())
            .then(createModuleFiles());
        }

        function createModule() {
            fse.ensureDirAsync(modulesDir + path.sep + name, function(err) {
                if (err) {
                    return console.error(err);
                } else {
                    self.emit('module.created');
                }
            });
        }

        function createModuleFiles() {
            au.generateTemplateFile(fp.indexSrc, fp.indexDest, name);
            au.generateTemplateFile(fp.routesSrc, fp.routesDest, name);
            au.generateTemplateFile(fp.ctrlSrc, fp.ctrlDest, name);
            au.generateTemplateFile(fp.ctrlSpecSrc, fp.ctrlSpecDest, name);
            au.generateTemplateFile(fp.directiveSrc, fp.directiveDest, name);
            au.generateTemplateFile(fp.stylesSrc, fp.stylesDest, name);
            au.generateTemplateFile(fp.htmlSrc, fp.htmlDest, name);
        }
    };
}

module.exports = FileCreator;