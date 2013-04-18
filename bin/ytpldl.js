var colors = require('colors'),
    argv = require('optimist').argv,
    ytpldl = require('../lib/ytpldl');

var args = process.argv.slice(2);


ytpldl(args[0], args[1]);


