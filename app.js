const yargs = require('yargs');
const get = require('./cmd/get.js');
const add = require('./cmd/add.js');
const read = require('./cmd/read.js');
const del = require('./cmd/del.js');

get(yargs);
add(yargs);
read(yargs);
del(yargs);
yargs.parse();