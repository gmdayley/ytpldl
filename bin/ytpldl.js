#!/usr/bin/env node

var colors = require('color'),
    argv = require('optimist').argv,
    ytpldl = require('../lib/ytpldl').ytpldl;

var args = process.argv.slice(2);

// TODO add usage and argument check

ytpldl(args[0], args[1]);


