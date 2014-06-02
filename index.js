
/**
 * Module dependencies.
 */

var classes = require('classes');
var query = require('querystring');

/**
 * Expose `Pagan`.
 */

exports = module.exports = Pagan;

var defaults = {
  adjacent: 2
};

function Pagan(el, options) {
  if (!(this instanceof Pagan)) {
    return new Pagan(el);
  }
  this.wrapper = el.nodeType === 1
    ? el
    : typeof el === 'string'
      ? document.querySelector(el)
      : null;
  this.options = options || {};
  this.applyOptions();
  console.log('this: ', this);
}

Pagan.prototype.applyOptions = function () {
  var that = this;
  ['total', 'adjacent', 'path']
  .forEach(function (opt) {
    if (that.options.hasOwnProperty(opt)) {
      that[opt] = that.options[opt];
    } else if (defaults.hasOwnProperty(opt)) {
      that[opt] = defaults[opt];
    }
  });
};


