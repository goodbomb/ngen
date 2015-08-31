'use strict';

// =======================================================================
// Module Setup
// =======================================================================
var fse = require('fs-extra'),
	path = require('path'),
	BaseClass = require('./BaseClass.js'),
    AppUtils = require('./AppUtils'),
	FILEPATH = require('../lib/FILEPATH.js'),
	fp = new FILEPATH();


// =======================================================================
// Module Logic
// =======================================================================

class FileDestroyer extends BaseClass {
    
    destroyModule(name) {
        var self = this,
            targetModule = fp.appRoot + path.sep + 'modules' + path.sep + name;

        self.on('module.destroyed', function(){
            AppUtils.log('Module "' + targetModule + '" destroyed.');
        });

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

    cancelAction() {
        return 'Action Cancelled';
    };
}

module.exports = FileDestroyer;