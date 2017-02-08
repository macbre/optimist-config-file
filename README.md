# optimist-config-file [![Build Status](https://travis-ci.org/macbre/optimist-config-file.svg?branch=master)](https://travis-ci.org/macbre/optimist-config-file)

Extends [`optimist` npm module](https://www.npmjs.com/package/optimist) with support for JSON/YAML config file and [Docker's inspired environment variables handling](https://docs.docker.com/compose/environment-variables/).

## How to use it

> Refer to [`examples/example.js`](https://github.com/macbre/optimist-config-file/blob/master/examples/example.js)

```
npm install --save optimist-config-file
```

```js
const program = require('optimist-config-file');

program
	.usage('...')
	// ...
	.describe('config', 'uses JSON or YAML-formatted config file to set parameters').string('config');

// handle --config option for passing YAML/JSON config files
program.setConfigFile('config');

// allow env variables to be passed
program.setReplacementVars(process.env);

// parse options
const options = program.parse(process.argv);

console.log(options);
```
