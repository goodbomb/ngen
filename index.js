#!/usr/bin/env node

var program = require('commander'),
	readline = require('readline'),
	fse = require('fs-extra'),
	path = require('path');

var FileCreator = require('./lib/FileCreator.js'),
	FileDestroyer = require('./lib/FileDestroyer.js');

program
	.version('0.0.1');

// =======================================================================
// Setup for common command functions
// =======================================================================
var rl = readline.createInterface(process.stdin, process.stdout);


// =======================================================================
// Create Commands
// =======================================================================
program
	.command('create module [name]')
	.description('Create scaffolding for a new module')
	.action(function(name){
		var cf = new FileCreator();
		cf.createModule(name);
		rl.close();
	});


// =======================================================================
// Destroy Commands
// =======================================================================
program
	.command('destroy module [name]')
	.description('Remove scaffolding for module [name]')
	.action(function(name){
		rl.setPrompt("Are you sure you want to destroy the module '" + name + "' and all of its contents? This action cannot be undone. (Yes / No) : ");
		rl.prompt();

		rl.on('line', function(answer) {
			
			var df = new FileDestroyer();

			if (answer.toUpperCase() === 'YES' || answer.toUpperCase() === 'Y') {

				df.destroyModule(name);

				df.on('module.deleted', function() {
					rl.close();
				});

			} else if (answer.toUpperCase() === 'NO' || answer.toUpperCase() === 'N') {
				df.cancelAction();
				rl.close();
			} else {
				console.log('Invalid Entry');
				rl.prompt();
			}
		}).on('close', function() {
			setTimeout(function(){
				process.exit(0);
			}, 200);
		});
	});


// =======================================================================
// If no commands are present, run the "help" command
// =======================================================================
if (process.argv.length === 2) {
	program.help();
	process.exit();
}

program.parse(process.argv);
