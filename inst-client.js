// import module
var osc = require('osc4node');

Instrument = function (host, port) {
  this.$server = new osc.Server(port - 1, host);
  this.$client = new osc.Client(host, port);
  this.$host = host;
  this.$host = port;
};

Instrument.prototype.play = function (pitch, velocity, duration) {
  var mess = pitch + " " + velocity + " " + duration;
  var message = new osc.Message('/inst/play', mess);
  console.log("PLAY " + mess);
  this.$server.send(message, this.$client);
};

Instrument.prototype.tuningSet = function (pitch_class, cents) {
  var mess = pitch_class + " " + cents;
  var message = new osc.Message('/inst/tuning/set', mess);
  console.log("TSET " + mess);
  this.$server.send(message, this.$client);
};

var inst = new Instrument('localhost', 12000);

// Play random notes, changing the tuning of each note.
var id = setInterval(function() {
  pitch = Math.floor(Math.random() * 80) + 30;
  pc = pitch % 12;

  cents = Math.floor(Math.random() * 200) - 100;
  inst.tuningSet(pc, cents);

  pitch = Math.floor(Math.random() * 80) + 30;
  inst.play(pitch, 120, 990);
}, 1000);

// Play random notes with an offset to get overlap
var i = setTimeout(function() {
  var id2 = setInterval(function() {
    pitch = Math.floor(Math.random() * 80) + 30;
    inst.play(pitch, 120, 990);
  }, 1000);
}, 400);
