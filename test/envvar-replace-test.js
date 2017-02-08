var vows = require('vows'),
	assert = require('assert'),
	path = require('path'),
	replace = require('../lib/envvar-replace');

vows.describe('module').addBatch({
	'when called with a string with no variables': {
		topic: replace('foo', {}),
		'we get back the original string': function(err, replaced) {
			assert.equal('foo', replaced);
		}
	},
	'when called with a string with a variable': {
		topic: replace('foo: ${MYVAR}', {
			MYVAR: 'bar'
		}),
		'the variable should be replaced': function(err, replaced) {
			assert.equal(replaced, 'foo: bar');
		}
	},
	'when called with a string with multiple variables': {
		topic: replace('foo: ${MYVAR} baz: ${MYOTHERVAR}', {
			MYVAR: 'bar',
			MYOTHERVAR: 'boo',
		}),
		'all variables should be replaced': function(err, replaced) {
			assert.equal(replaced, 'foo: bar baz: boo');
		}
	},
	'when called with a string containing variables we do not have': {
		topic: function() {
			try {
				this.callback(null, replace('foo: ${MYVAR}', {}));
			} catch (err) {
				this.callback(err);
			}
		},
		'an error should be thrown': function(err, replaced) {
			assert.equal(err.message, 'Unknown variable: MYVAR');
		}
	},
	'when called with an escaped environment variable': {
		topic: replace('foo: $${MYVAR}', {}),
		'the variable should not be replaced': function(err, replaced) {
			assert.equal(replaced, 'foo: $${MYVAR}');
		}
	},
	'when called with a string containing a variable with a default value': {
		topic: replace('foo: ${MYVAR:-baz}', {}),
		'the default value should be used': function(err, replaced) {
			assert.equal(replaced, 'foo: baz');
		}
	},
	'when called with a string containing a variable with a complex default value': {
		topic: replace('foo: ${MYVAR:-http://google.com}', {}),
		'the default value should be used': function(err, replaced) {
			assert.equal(replaced, 'foo: http://google.com');
		}
	}
}).export(module);
