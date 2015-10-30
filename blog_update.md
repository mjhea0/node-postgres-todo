
within 'Postgres Setup' after the npm install add:

Create a new database called 'todo' using the command line:

```
createdb todo
```

Then fire up the database:

```
psql todo
```
It listens on `port 5432` by default.
__________________________________________
__________________________________________

within 'Server-side Routes':

// change this:

```javascript
var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require(path.join(__dirname, '../', '../', 'config'));   
```
_____________________________________

// to this:

```javascript
var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('postgres://localhost:5432/todo');
```

// also add:
Heads Up: It may be necessary to add the user name to the connection string:
`'postgres://petej@localhost:5432/todo'`

If it is necessary there are 2 places to update, here and in models/database.js.

_____________________________________

// or this:

### Add config.js file to root directory:
```javascript
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

module.exports = connectionString;
```

```javascript
var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = ('path'); // *required path
var connectionString = require(path.join(__dirname, '../', '../', 'config'));   
```

// also add:
Heads Up: It may be necessary to add the user name to the connection string:
`'postgres://petej@localhost:5432/todo'`

If it is necessary there are 2 places to update, here and in models/database.js.

