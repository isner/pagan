
var Pagan = require('pagan');

var wrapOne = document.getElementById('wrap-one');
var wrapTwo = document.getElementById('wrap-two');
var wrapThree = document.getElementById('wrap-three');

// setting options via object argument
var paganOne = new Pagan(wrapOne, {
  total: 5,
  adjacent: 1,
  param: 'pg',
  showErrors: true
});

// relying on default options
var paganTwo = new Pagan(wrapTwo);
paganTwo.total(10);

// setting options via API methods
var paganThree = new Pagan(wrapThree);
paganThree.total(15);
paganThree.adjacent(3);
paganThree.param('page');
paganThree.showErrors(true);

// render them all
paganOne.render();
paganTwo.render();
paganThree.render();
