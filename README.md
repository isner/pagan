## pagan
Pagination from the classical period

### Installation
Install with Component
```
component install isner/pagan
```

### Basic Usage
To insert pagan pagination into an empty div:
```
var pagan = require('pagan');

var pagination = document.querySelector('.myPaginationWrapper');
var totalPages = 10; // total number of pages

pagan(pagination, totalPages);
```

### API

#### pagan(elem, total, [adj], [path])

##### elem
Element into which the pagination will be inserted.

##### total
Total number of pages represented by the pagination bar.

##### adj (optional)
Number of pages on either side of the current page to display.
Default: `2`

##### path (optional)
`href` value to be added to each page link.