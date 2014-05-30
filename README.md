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
