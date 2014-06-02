
/**
 * Module dependencies.
 */

var classes = require('classes');
var query = require('querystring');

/**
 * Expose `pagan`.
 */

exports = module.exports = pagan;


function pagan(elem, total, adj, path) {
  total = total || 1;
  adj = adj || 2;
  path = path || location.pathname;

  var curr = query.parse(location.search).p;
  curr = curr ? parseInt(curr) : 1;

  classes(elem).add('pagan');

  if (curr > 1) {
    elem.appendChild(pageLink(curr - 1, path, 'Prev'));
  }

  var i = 1;
  while (i <= total) {
    if (i == curr) {
      elem.appendChild(makeSpan('curr', i));
    } else if (
      (i >= (curr - adj) && i < curr) ||
      (i <= (curr + adj) && i > curr) ||
      (i === 1) ||
      (i === total)
    ) {
      elem.appendChild(pageLink(i, path));
    } else {
      if (i < curr && !document.querySelector('.pagan .ell-left')) {
        elem.appendChild(makeSpan('ell-left', '...'));
      } else if (i > curr && !document.querySelector('.pagan .ell-right')) {
        elem.appendChild(makeSpan('ell-right', '...'));
      }
    }

    i++;
  }

  if (curr < total) {
    elem.appendChild(pageLink(curr + 1, path, 'Next'));
  }
}

/**
 * Generates a page link.
 *
 * @param {Number} toPage
 * @param {String} text
 * @param {String} path
 * @return {Element}
 * @api private
 */

function pageLink(toPage, path, text) {
  path = path || location.pathname;
  text = text || toPage.toString();
  var link = document.createElement('a');
  link.href = path + '?p=' + toPage;
  link.innerHTML = text;

  var clipper = makeSpan('clip', 'Page');
  link.insertBefore(clipper, link.firstChild);

  return link;
}

/**
 * Generates a dummy link for the current page.
 *
 * @param {Number} page
 * @return {Element}
 * @api private
 */

function makeSpan(classname, content) {
  var elem = document.createElement('span');
  classes(elem).add(classname);
  elem.innerHTML = content;
  return elem;
}
