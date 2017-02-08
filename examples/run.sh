#!/bin/sh
./example.js -h

DEBUG=* ./example.js  --config config.yaml

HOSTNAME=`hostname` DEBUG=* ./example.js  --config config.yaml
