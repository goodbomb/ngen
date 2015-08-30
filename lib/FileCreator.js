'use strict';

// =======================================================================
// Module Setup
// =======================================================================
var path = require('path'),
	Promise = require('bluebird'),
	fse = Promise.promisifyAll(require('fs-extra')),
	BaseClass = require('./BaseClass.js'),
	AppUtils = require('./AppUtils'),
	au = new AppUtils();


// =======================================================================
// Module Logic
// =======================================================================

class FileCreator extends BaseClass {

    createModule(name) {
        var self = this,
            modulesDir = BaseClass.getAppRoot() + path.sep + 'modules';

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
            }).then(createModule());
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
    };
}

module.exports = FileCreator;