var os = require('os');

var FNAME = os.homedir() + '/.tasks.json';

var fs = require('fs');

var cmds = function () {
	this.helpmsg = {
		l   : 'Lists tasks',
		lr  : 'Lists tasks based on desc regex',
		n   : 'Creates new task. Param taskname',
		d   : 'Deletes task. Param ID',
		c   : 'Marks task as complete. Param ID',
		u   : 'Marks task as incomplete. Param ID',
		help: 'This help message'
	}
}

cmds.prototype.l    = function () {
	for (i in this.tasks) {
		if (i != '__count') {
			console.log(`${i}\t[${this.tasks[i].complete ? '*' : ' '}] ${this.tasks[i].desc}`);
		}
	}
}
cmds.prototype.lr   = function () {
	var regex = new RegExp(this.args[3]);
	for (i in this.tasks) {
		if (i != '__count') {
			if (regex.test(this.tasks[i].desc)) {
				console.log(`${i}\t[${this.tasks[i].complete ? '*' : ' '}] ${this.tasks[i].desc}`);
			}
		}
	}
}
cmds.prototype.s    = function () {
	fs.writeFileSync(FNAME, JSON.stringify(this.tasks));
}
cmds.prototype.n    = function () {
	var t            = {
		id  : this.tasks.__count,
		desc: this.args[3]
	}
	this.tasks[t.id] = t;
	this.tasks.__count++;
	this.s();
}
cmds.prototype.d    = function () {
	var id = this.args[3];
	delete this.tasks[id];
	this.s();
}
cmds.prototype.c    = function () {
	var id                  = this.args[3];
	this.tasks[id].complete = true;
	this.s();
}
cmds.prototype.u    = function () {
	var id                  = this.args[3];
	this.tasks[id].complete = false;
	this.s();

}
cmds.prototype.help = function () {
	console.log('HELP');
	for (i in this.helpmsg) {
		console.log(i + '\t' + this.helpmsg[i]);
	}
}

cmds.prototype.load = function () {
	try {
		var fscontent = fs.readFileSync(FNAME).toString();
		this.tasks    = JSON.parse(fscontent);
	} catch (err) {
		this.tasks         = {};
		this.tasks.__count = 0;
		this.s();

	}
}

module.exports = cmds;
