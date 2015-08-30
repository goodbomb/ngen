'use strict';

// =======================================================================
// Module Setup
// =======================================================================
var Promise = require('bluebird'),
	events = require('events'),
	path = require('path'),
	fse = Promise.promisifyAll(require('fs-extra')),
	AppUtils = require('./AppUtils');


// =======================================================================
// Module Logic
// =======================================================================

class BaseClass extends events.EventEmitter {

    /**
     * Returns the full path for the supplied filename
     * 
     * @param  {string} The filename to search for recursively.
     * @return {string} The root path of the filename.
     */
    static getAppRoot(filename) {

        var rootPath;

        if (!filename) {
            rootPath = AppUtils.getFileLocation('package.json');
        } else {
            try {
                rootPath = AppUtils.getFileLocation(filename);
            } catch(err) {
                throw new Error('A valid application root could not be found.');
            }
        }

        return rootPath;
    };

    /**
     * Gets the full path to the source file to copy.
     * 
     * @param  {string} The name of the template file.
     * @return {string} The full path of the file in the /src folder.
     */
    static getSrcPath(filename) {

        var appRoot = BaseClass.getAppRoot();
        var filePath = appRoot + path.sep + 'src' + path.sep + 'templates' + path.sep + filename;

        if (fse.existsSync(filePath)) {
            return filePath;
        } else {
            throw new Error('The requested file does not exist.');
        }
    };

    /**
     * Sets the full path for the destination file.
     * 
     * @param  {string} The name that the file will be given in its new destination.
     * @return {string} The full path and file name.
     */
    static setDestPath(filename) {

        var appRoot = BaseClass.getAppRoot();
        var fileDest = appRoot + path.sep + 'modules' + path.sep + filename;
        
        return fileDest;
    };
}

module.exports = BaseClass;