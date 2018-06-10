const express = require('express');
const router = express.Router();
const { Client } = require('pg');
const connectionString = process.env.DATABASE_URL;
const pg = new Client({ connectionString });
pg.connect();
const path = require('path');


router.get('/', (req, res, next) => {
  res.sendFile(path.join(
    __dirname, '..', '..', 'client', 'views', 'index.html'));
});

router.get('/api/v1/todos', (req, res, next) => {
  const results = [];
  // Get a Postgres client from the connection pool

  return pg.query('SELECT * FROM items ORDER BY id ASC;')
    .then(({ rows }) => res.json(rows))
    .catch(e => console.log(e) || res.status(500).json({success: false, data: e}));

  /*pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if (err) {
      done();

    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM items ORDER BY id ASC;');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });*/
});

router.post('/api/v1/todos', (req, res, next) => {
  const results = [];
  // Grab data from http request
  const data = {text: req.body.text, complete: false};

  return pg.query('INSERT INTO items(text, complete) values($1, $2)', [data.text, data.complete])
    .then(() => pg.query('SELECT * FROM items ORDER BY id ASC'))
    .then(({ rows }) => res.json(rows))
    .catch(e => console.log(e) || res.status(500).json({success: false, data: e}));

  // Get a Postgres client from the connection pool
  /*pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert Data
    client.query('INSERT INTO items(text, complete) values($1, $2)',
    [data.text, data.complete]);
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM items ORDER BY id ASC');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });*/
});

router.put('/api/v1/todos/:todo_id', (req, res, next) => {
  const results = [];
  // Grab data from the URL parameters
  const id = req.params.todo_id;
  // Grab data from http request
  const data = {text: req.body.text, complete: req.body.complete};

  return pg.query('UPDATE items SET text=($1), complete=($2) WHERE id=($3)', [data.text, data.complete, id])
    .then(() => pg.query('SELECT * FROM items ORDER BY id ASC'))
    .then(({ rows }) => res.json(rows))
    .catch(e => console.log(e) || res.status(500).json({success: false, data: e}));

  // Get a Postgres client from the connection pool
  /*pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Update Data
    client.query('UPDATE items SET text=($1), complete=($2) WHERE id=($3)',
    [data.text, data.complete, id]);
    // SQL Query > Select Data
    const query = client.query("SELECT * FROM items ORDER BY id ASC");
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });*/
});

router.delete('/api/v1/todos/:todo_id', (req, res, next) => {
  const results = [];
  // Grab data from the URL parameters
  const id = req.params.todo_id;

  return pg.query('DELETE FROM items WHERE id=($1)', [id])
    .then(() => pg.query('SELECT * FROM items ORDER BY id ASC'))
    .then(({ rows }) => res.json(rows))
    .catch(e => console.log(e) || res.status(500).json({success: false, data: e}));

  // Get a Postgres client from the connection pool
  /*pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Delete Data
    client.query('DELETE FROM items WHERE id=($1)', [id]);
    // SQL Query > Select Data
    var query = client.query('SELECT * FROM items ORDER BY id ASC');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });*/
});

module.exports = router;
