var path = require('path'),
	FileCreator = require('./FileCreator.js'),
	BaseClass = require('./BaseClass.js'),
	AppUtils = require('./AppUtils'),
	au = new AppUtils,
	fse = require('fs-extra'),
	async = require('async');


var a = new BaseClass;
console.log(a.filePaths.asd);


var test = function (){
	// var numDirs = path.resolve(filename).split('/');
	// var dir = __dirname;
	// var queries = [];

	// for (var i=0; i < numDirs.length; i++) {
	// 	var query = path.resolve(dir + '/' + filename);
	// 	dir = path.resolve(dir.concat('/..'));
	// 	queries.push(query);
	// }

	// (function(){}
	// async.detect(queries, fse.exists, detectCallback);

	// function detectCallback(results){
	// 	return results;
	// };

	// console.log(detectCallback());
	// (function(){
		async.waterfall([
		    function(callback){
		    	var filename = 'package.json';
		    	var ee = this;
				var numDirs = path.resolve(filename).split('/');
				var dir = __dirname;
				var queries = [];

				for (var i=0; i < numDirs.length; i++) {
					var query = path.resolve(dir + '/' + filename);
					dir = path.resolve(dir.concat('/..'));
					queries.push(query);
				}

				async.detect(queries, fse.exists, function(result){
					callback(null, result);
				});
		        
		    }
		], function (err, result) {
			if (err) {console.error(err)}
			console.log(result);
			return result;
		});
	// })();
	
};
