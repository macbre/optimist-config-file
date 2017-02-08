var vows = require('vows'),
	assert = require('assert'),
	path = require('path'),
	program = require('../');

function importFile(filename, argv, replacements) {
	argv = argv || [];
	argv.push('--config=' + filename);
	var app = program;
	app.setConfigFile('config');
	app.setReplacementVars(replacements);
	return app.parse(argv);
}

var fixtures = path.join(__dirname, 'fixtures');

vows.describe('config file parsing').addBatch({
	'should parse a .yaml file': {
		topic: importFile(path.join(fixtures, 'config.yaml')),
		'should move config into options': function(err, options) {
			assert.equal(err, null);
			assert.equal(options.format, 'yaml');
		}
	},
	'should parse a .yml file': {
		topic: importFile(path.join(fixtures, 'config.yml')),
		'should move config into options': function(err, options) {
			assert.equal(err, null);
			assert.equal(options.format, 'yml');
		}
	},
	'should parse a .json file': {
		topic: importFile(path.join(fixtures, 'config.json')),
		'should move config into options': function(err, options) {
			assert.equal(err, null);
			assert.equal(options.format, 'json');
		}
	},
	'should accept command line options': {
		topic: importFile(path.join(fixtures, 'config.json'), ['--format=bson', '--test=baz']),
		'config file options should take precendence over CLI flags': function(err, options) {
			assert.equal(err, null);
			assert.equal(options.format, 'json');
		},
		'additional CLI options are merged in': function(err, options) {
			assert.equal(err, null);
			assert.equal(options.test, 'baz');
		}
	},
	'should fail when trying to parse an unknown file': {
		topic: function() {
			try {
				importFile(path.join(fixtures, 'nonexistent.json'));
			} catch (err) {
				this.callback(err);
			}
		},
		'should throw an error': function(err, options) {
			assert.equal(err, 'Config file "' + path.join(fixtures, 'nonexistent.json') + '" cannot be found!');
		}
	},
	'should fail when trying to parse a broken file': {
		topic: function() {
			try {
				importFile(path.join(fixtures, 'broken.json'));
			} catch (err) {
				this.callback(err);
			}
		},
		'should throw an error': function(err, options) {
			assert.ok(err.indexOf('JSON config file parsing failed (SyntaxError: Unexpected token') === 0);
		}
	},
	'should interpolate environment variables': {
		topic: importFile(path.join(fixtures, 'envvars.yaml'), null, {
			SIMPLE: 'foo'
		}),
		'should replace a simple variable': function(err, options) {
			assert.equal(options.simple, 'foo/bar');
		},
		'should allow a default value for a variable': function(err, options) {
			assert.equal(options.default, 'baz/bar');
		}
	}
}).export(module);
