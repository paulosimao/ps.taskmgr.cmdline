var fs = require('fs');
var os = require('os');

var FNAME = os.homedir() + '/.tasks.json';
var Cmds  = require('./cmds');
var cmds  = new Cmds();
cmds.args = process.argv;
cmds.load();

var cmd = process.argv[2] || 'help';
cmds[cmd]();