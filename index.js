
/**
 * Module dependencies.
 */

var classes = require('classes');
var query = require('querystring');

/**
 * Expose `pagan`.
 */

exports = module.exports = pagan;


function pagan(elem, total, adj) {
  total = total || 1;

  var curr = query.parse(location.search).p;
  curr = curr ? parseInt(curr) : 1;

  classes(elem).add('pagan');

  if (curr > 1) {
    elem.appendChild(pageLink(curr - 1, 'Prev'));
  }

  var i = 1;
  var prev;
  while (i <= total) {
    if (i == curr) {
      elem.appendChild(makeSpan('curr', i));
    } else if (
      (i >= (curr - adj) && i < curr) ||
      (i <= (curr + adj) && i > curr) ||
      (i === 1) ||
      (i === total)
    ) {
      elem.appendChild(pageLink(i));
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
    elem.appendChild(pageLink(curr + 1, 'Next'));
  }
}

/**
 * Generates a page link.
 *
 * @param {Number} toPage
 * @param {String} text
 * @return {Element}
 * @api private
 */

function pageLink(toPage, text) {
  text = text || toPage.toString();
  var path = location.pathname;
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
