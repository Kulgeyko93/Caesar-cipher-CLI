const argv = require('minimist')(process.argv.slice(2));
const readWrite = require('./read-write.js');

const shift = argv.s || argv.shift;
const action = argv.a || argv.action;
const input = `${argv.i}`.trim() || `${argv.input}`.trim();
const output = `${argv.o}`.trim() || `${argv.output}`.trim();
const minus = argv.m || argv.minus;

readWrite(shift, action, input, output, minus);