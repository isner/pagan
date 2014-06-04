
/**
 * Module dependencies.
 */

var classes = require('classes');
var query = require('querystring');
var rndid = require('rndid');

/**
 * Expose `Pagan`.
 */

exports = module.exports = Pagan;

/**
 * Define default options.
 */

var defaults = {
  total: 1,
  param: 'p',
  adjacent: 2,
  showErrors: false,
  path: location.pathname,
};

/**
 * Creates an instance of `Pagan#` within
 * a supplied element container (ideally
 * an empty div), with an optional
 * configuration object.
 *
 * @param {Element} el
 * @param {Object} [options]
 * @return {Pagan}
 * @api public
 */

function Pagan(el, options) {
  if (!(this instanceof Pagan)) {
    return new Pagan(el);
  }
  this.errors = [];
  if (!el) this.errors.push('undefined element argument');
  this.options = options || {};
  this.applyOptions();
  this.setContainer(el);

  return this;
}

/**
 * Applies user-specified `options`
 * or defaults, as necessary.
 *
 * @return {Pagan}
 * @api private
 */

Pagan.prototype.applyOptions = function () {
  var that = this;
  ['total', 'adjacent', 'path', 'param', 'showErrors']
  .forEach(function (opt) {
    that.options[opt] = that.options.hasOwnProperty(opt)
      ? that.options[opt]
      : defaults.hasOwnProperty(opt)
        ? defaults[opt]
        : null;
  });
  return this;
};

/**
 * Gets an option property of `Pagan#`.
 *
 * @param {String} prop
 * @return {Mixed}
 * @api public
 */

Pagan.prototype.get = function (prop) {
  if (this.options.hasOwnProperty(prop)) {
    return this.options[prop];
  }
  else {
    return null;
  }
};

/**
 * Sets `#options.total`.
 *
 * The total number of pages that should be
 * handled by this instance of pagination.
 *
 * Defaults to `1`.
 *
 * @param {Number} total
 * @return {Pagan}
 * @api public
 */

Pagan.prototype.total = function (total) {
  this.options.total = total;
  return this;
};

/**
 * Sets `#options.param`.
 *
 * The name of the query string parameter that
 * Pagan should look for in order to determine
 * the currently displayed page at any given
 * time.
 *
 * Defaults to `'p'`.
 *
 * @param {String} param
 * @return {Pagan}
 * @api public
 */

Pagan.prototype.param = function (param) {
  this.options.param = param;
  return this;
};

/**
 * Sets `#options.adjacent`.
 *
 * The number of immediately adjacent page buttons
 * to display on either side of the current page.
 * This does not include the first and last pages,
 * which will *always* be visible.
 *
 * Defaults to `2`.
 *
 * @param {Number} adjacent
 * @return {Pagan}
 * @api public
 */

Pagan.prototype.adjacent = function (adjacent) {
  this.options.adjacent = adjacent;
  return this;
};

/**
 * Sets `#options.showErrors`.
 *
 * Whether or not error messages should be logged
 * by Pagan in the event of invalid input.
 *
 * Default to `false`.
 *
 * @param {Boolean} status
 * @return {Pagan}
 * @api public
 */

Pagan.prototype.showErrors = function (status) {
  this.options.showErrors = status;
  return this;
};

/**
 * Sets `#options.path`.
 *
 * The `href` of each link in the pagination, minus
 * the query parameter which is added by Pagan.
 * Useful for ensuring that your server-side routing
 * has the opportunity to redirect non-intuitive,
 * developer-stipulated paths.
 *
 * Defaults to the value of `window.location.pathname`.
 *
 * @param {String} path
 * @return {Pagan}
 * @api public
 */

Pagan.prototype.path = function (path) {
  this.options.path = path;
  return this;
};

/**
 * Attaches pagination to a `#container`.
 *
 * @param {Element|Selector} el
 * @api private
 */

Pagan.prototype.setContainer = function (el) {
  if (arguments.length === 0) return this.container;
  if (typeof el === 'string') {
    el = document.querySelector(el);
  }
  if (!el || !el.nodeType || el.nodeType !== 1) {
    this.container = null;
    this.errors.push('invalid element argument');
  }
  else {
    el.id = rndid();
    classes(el).add('pagan');
    this.container = el;
  }
  return this;
};

/**
 * Sets `#current` based on `#options.queryParam`.
 *
 * Defaults to `1`.
 *
 * @return {Pagan}
 * @api private
 */

Pagan.prototype.setCurrent = function () {
  var curr = query.parse(location.search)[this.options.param];
  this.current = curr ? parseInt(curr, 10) : 1;
  return this;
};

/**
 * Renders the pagination content. Adds all
 * necessary buttons (active and incative).
 *
 * @return {Pagan}
 * @api public
 */

Pagan.prototype.render = function () {
  this.setCurrent();

  var curr = this.current;
  var total = this.options.total;
  var adj = this.options.adjacent;
  var cont = this.container;

  if (this.errors.length) {
    return this.invalid();
  }

  if (curr > 1) {
    cont.appendChild(
      this.button(curr - 1, 'Prev')
    );
  }

  for (var i = 1; i <= total; i++) {
    if (i == curr) {
      cont.appendChild(
        this.inactive(i, 'curr')
      );
    }
    else if (
      (i >= (curr - adj) && i < curr) ||
      (i <= (curr + adj) && i > curr) ||
      (i === 1) ||
      (i === total)
      ) {
      cont.appendChild(
        this.button(i)
      );
    }
    else {
      if (i < curr && this.noEllipsis('left')) {
        cont.appendChild(
          this.inactive('...', 'left-ell')
        );
      }
      if (i > curr && this.noEllipsis('right')) {
        cont.appendChild(
          this.inactive('...', 'right-ell')
        );
      }
    }
  }

  if (curr < total) {
    cont.appendChild(
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
  var path = this.options.path;

  var a = document.createElement('a');
  a.href = path + '?' + this.options.param + '=' + page;
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
  return !document.querySelector(
    '#' + this.container.id + ' .' + side + '-ell'
   );
};

/**
 * Logs errors to the console, if
 * `#options.showErrors` is set to `true`.
 *
 * @api private
 */

Pagan.prototype.invalid = function () {
  if (!this.options.showErrors) return this;
  this.errors.forEach(function (error) {
    console.error('Pagan error: ', error);
  });
};
