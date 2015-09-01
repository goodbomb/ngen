'use strict';

// =======================================================================
// Module Setup
// =======================================================================
var events = require('events'),
	util = require('util'),
	fse = require('fs-extra'),
	path = require('path'),
	replaceStream = require('replacestream');


// =======================================================================
// Module Logic
// =======================================================================

class AppUtils extends events.EventEmitter {

    constructor() {
        super();
    }

    /**
     * Basic logger - uses console log in non-test environments.
     *
     * @param  {string} message - The message to log.
     */
    static log(message) {
        if (process.env.NODE_ENV !== 'test') {
            console.log(message);
        }
    };

    /**
     * Recursively searches for the supplied file name.
     * 
     * @param  {string} filename - The file name to search for.
     * @return {string} The full path of the nearest file.
     */
    static getFileLocation(filename) {
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

    /**
     * Capitalises the first letter of a string.
     *
     * @param  {string} string - The string to capitalise.
     * @return {string}
     */
    static capitaliseFirstLetter(string) {
        if (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    };

    /**
     * Returns the name of the angular app defined in the app.js file.
     * 
     * @return {string} The name of the angular application.
     */
    static getAppName() {

        var rootPath = AppUtils.getFileLocation('package.json');

        if (process.env.NODE_ENV !== 'test') {

            var data = fse.readFileSync(rootPath + path.sep + 'app' + path.sep + 'app.js', "utf-8");

        } else {

            var s = path.sep;
            var data = fse.readFileSync(rootPath + s + 'test' + s + 'mock' + s + 'app' + s + 'app.js', "utf-8");
        }

        var appNameLocation = data.match("angular.module(.*),");
        var appName = appNameLocation[1].replace(/[^\w\s]/gi, '');

        return appName;
    }

    /**
     * Pipes a template file to the specified module.
     * Replaces the {%MODULENAME%} variable with the supplied moduleName.
     * 
     * @param {string} src - The source path for the template file.
     * @param {string} dest - The destination path for the generated file.
     * @param {string} moduleName - The name of the module.
     * @return {string}
     */
    generateTemplateFile(src, dest, moduleName) {
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
        .pipe(replaceStream('{%APP_NAME%}', AppUtils.getAppName()))
        .pipe(replaceStream('{%CTRL_NAME%}', AppUtils.capitaliseFirstLetter(moduleName)))
        .pipe(wf);

        function done(err) {
            if (err) {
                return console.error(err);
            } else {
                ee.emit('file.generated');
            }
        }
    };
}

module.exports = AppUtils;