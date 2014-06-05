# pagan
Pagination from the classical period. Pagan inserts a series
of pagination links into a specific element on your page.

![Pagan sample](https://dl.dropboxusercontent.com/u/59664306/pagan-sample.PNG)

## Installation

Install with Component
```
$ component install isner/pagan
```

## Basic Usage

Pagan requires an empty element into which to be
inserted - this should be a block-level element,
like a `<div/>`. Get a handle on your insertion
point, instantiate a Pagan, and give it some
options.
```
var Pagan = require('pagan');
var container = document.querySelector('.myElement');

var pagan = new Pagan(container);
pagan.total(12); // total number of pages (IMPORTANT)
pagan.render();
```

## API

### new Pagan(Element|Selector, [options])

Creates an instance of `Pagan#` within
a supplied `element` container (ideally
an empty div).

Options for each instance of Pagan can be set
using the methods outlined below, or via the
`options` object argument.

### Pagan#total(Number)

Sets `Pagan#options.total`.

The total number of pages that should be handled
by this instance of pagination.

Defaults to `1`.

### Pagan#param(String)

Sets `Pagan#options.param`.

The name of the query string parameter that
Pagan should look for in order to determine
the currently displayed page at any given
time.

Defaults to `'p'`.

### Pagan#adjacent(Number)

Sets `Pagan#options.adjacent`.

The `number` of immediately adjacent page buttons
to display on either side of the current page.
This does not include the first and last pages,
which will *always* be visible.

Defaults to `2`.

### Pagan#path(String)

Sets `Pagan#options.path`.

The `href` of each link in the pagination, minus
the query parameter which is added by Pagan.
Useful for ensuring that your server-side routing
has the opportunity to redirect non-intuitive,
developer-stipulated paths.

Defaults to the value of `window.location.pathname`.

### Pagan#render()

Renders the pagination content. Adds all
necessary buttons (active and inactive),
determines which is the current page, and
where all ellipses should be located.

### Pagan#get(String)

Getter method for any current option of `Pagan#`.
```
pagan.get(path);
// => 'mysite.com/about'

pagan.get(adjacent);
// => 2
```
