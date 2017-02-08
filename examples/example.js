#!/usr/bin/env node
const debug = require('debug')('optimist-config-file:example'),
	program = require('..');

program
	.usage('An example for optimist-config-file npm package\n\n./example.js [options]')
	// mandatory
	.header('General options')
	.describe('help', 'This help text').boolean('help').alias('help', 'h')
	.describe('foo', 'Like bar').string('foo')
	.describe('banner', 'Welcome message').string('foo')
	.describe('config', 'uses JSON or YAML-formatted config file to set parameters').string('config');

// handle --config option for passing YAML/JSON config files
program.setConfigFile('config');

// allow env variables to be passed
program.setReplacementVars(process.env);

// parse options
var options = program.parse(process.argv);

// show help
if (options.help === true) {
	program.showHelp();
	process.exit(0);
}

debug(options);
console.log(options.banner);
