# pagan
Pagination from the classical period

## Installation

Install with Component
```
$ component install isner/pagan
```

## Basic Usage

Pagan requires an empty element into which to be inserted.
Get a handle on your insertion point, instantiate a Pagan,
and give it some options.
```
var Pagan = require('pagan');
var container = document.querySelector('.myElement');
var pagan = new Pagan(container, { total: 10 });
```

## API

### new Pagan(element, [options])

Instantiates a Pagan.

#### element {Element}

The container into which the pagination will be inserted.
Ideally, this should be an empty `<div/>`.

#### options {Object}

##### options.total

The total number of pages represented by this pagination.

Default value: `1`

##### options.adjacent

The number of pages to display on either side of the
current page.

Default value: `2`

##### options.path

The desired `href` value of each page link, without
querystring. Ex: `{ path: '/content/articles' }`
will create `href`s of  `/content/articles?p={n}`, and
so on.

Default value: `window.location.pathname`
