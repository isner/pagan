
/**
 * Module dependencies.
 */

var classes = require('classes');
var query = require('querystring');

/**
 * Expose `Pagan`.
 */

exports = module.exports = Pagan;

/**
 * Define default options.
 */

var defaults = {
  total: 1,
  adjacent: 2
};

/**
 * Creates an instance of `Pagan` within
 * a supplied element container (ideally
 * empty), with optional configuration.
 *
 * @param {Element} el
 * @param {Object} options
 * @return {Pagan}
 * @api private
 */

function Pagan(el, options) {
  if (!(this instanceof Pagan)) {
    return new Pagan(el);
  }
  this.errors = [];
  this.options = options || {};
  this.applyOptions();
  this.setContainer(el);
  this.setPath();
  this.currentPage();
  this.addButtons();

  return this;
}

/**
 * Applies user-specified `options`.
 *
 * @return {Pagan}
 * @api private
 */

Pagan.prototype.applyOptions = function () {
  var that = this;
  ['total', 'adjacent', 'path']
  .forEach(function (opt) {
    that[opt] = that.options.hasOwnProperty(opt)
      ? that.options[opt]
      : defaults.hasOwnProperty(opt)
        ? defaults[opt]
        : null;
  });
  return this;
};

/**
 * Sets `#path` to user-supplied option or current
 * pathname.
 *
 * @return {Pagan}
 * @api private
 */

Pagan.prototype.setPath = function () {
  this.path = this.options.path || location.pathname;
  return this;
};

/**
 * Sets `#container` to the supplied element
 * reference, or result of a css-style query.
 *
 * @param {Element|Selector} el
 * @api private
 */

Pagan.prototype.setContainer = function (el) {
  if (typeof el === 'string') {
    el = document.querySelector(el);
  }
  if (!el || !el.nodeType || el.nodeType !== 1) {
    this.container = null;
    this.errors.push('invalid element argument');
  }
  else {
    classes(el).add('pagan');
    this.container = el;
  }
  return this;
};

/**
 * Sets `#current` based on either the provided
 * value or the query parameter `p`.
 *
 * Defaults to 1.
 *
 * @return {Pagan}
 * @api private
 */

// TODO: Make the query parameter name configurable

Pagan.prototype.currentPage = function () {
  var curr = query.parse(location.search).p;
  this.current = curr ? parseInt(curr) : 1;
  return this;
};

/**
 * Adds all necessary buttons to the
 * pagination area.
 *
 * @return {Pagan}
 * @api private
 */

Pagan.prototype.addButtons = function () {
  var curr = this.current;
  var total = this.total;
  var adj = this.adjacent;

  if (curr > 1) {
    this.container.appendChild(this.button(curr - 1, 'Prev'));
  }

  for (var i = 1; i <= total; i++) {
    if (i == curr) {
      this.container.appendChild(
        this.inactive(i, 'curr')
      );
    }
    else if (
      (i >= (curr - adj) && i < curr) ||
      (i <= (curr + adj) && i > curr) ||
      (i === 1) ||
      (i === total)
      ) {
      this.container.appendChild(
        this.button(i)
      );
    }
    else {
      if (i < curr && this.noEllipsis('left')) {
        this.container.appendChild(
          this.inactive('...', 'left-ell')
        );
      }
      if (i > curr && this.noEllipsis('right')) {
        this.container.appendChild(
          this.inactive('...', 'right-ell')
        );
      }
    }
  }

  if (curr < total) {
    this.container.appendChild(
      this.button(curr + 1, 'Next')
    );
  }
  return this;
};

/**
 * Creates a page-number button for insertion
 * into the pagination area.
 *
 * @param {Number} page
 * @param {String} text
 * @return {Pagan}
 * @api private
 */

Pagan.prototype.button = function (page, text) {
  text = text || page.toString();
  var path = this.path;

  var a = document.createElement('a');
  a.href = path + '?p=' + page;
  a.innerHTML = text;

  // prepend each button's text content with
  // 'page' for screen readers, et al.
  var span = document.createElement('span');
  span.className = 'clip';
  span.innerHTML = 'page-';
  a.insertBefore(span, a.firstChild);

  return a;
};

/**
 * Creates an inactive button for insertion into
 * the pagination area, with specified text
 * content and classname.
 *
 * @param {String} text
 * @param {String} classname
 * @return {Pagan}
 * @api private
 */

Pagan.prototype.inactive = function (text, classname) {
  var span = document.createElement('span');
  classes(span).add(classname);
  span.innerHTML = text;
  return span;
};

/**
 * Tests for the absence of an existing inactive
 * button containing an ellipsis, on a given side
 * of the current page button.
 *
 * @param {String} side - 'left' or 'right'
 * @return {Boolean} - ellipsis needed or not
 * @api private
 */

Pagan.prototype.noEllipsis = function (side) {
  return !document.querySelector('.pagan .' +
   side + '-ell');
};
