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

router.get('/api/v1/todos', (req, res, next) => pg.query('SELECT * FROM items ORDER BY id ASC;')
    .then(({ rows }) => res.json(rows))
    .catch(e => console.error(e) || res.status(500).json({success: false, data: e})));

router.post('/api/v1/todos', (req, res, next) => pg.query('INSERT INTO items(text, complete) values($1, $2)', [req.body.text, false])
    .then(() => pg.query('SELECT * FROM items ORDER BY id ASC'))
    .then(({ rows }) => res.json(rows))
    .catch(e => console.error(e) || res.status(500).json({success: false, data: e})));

router.put('/api/v1/todos/:todo_id', (req, res, next) => {
  const { text, complete } = req.body;
  const { todo_id: id } = req.params;

  return pg.query('UPDATE items SET text=($1), complete=($2) WHERE id=($3)', [text, complete, id])
    .then(() => pg.query('SELECT * FROM items ORDER BY id ASC'))
    .then(({ rows }) => res.json(rows))
    .catch(e => console.log(e) || res.status(500).json({success: false, data: e}));
  });

router.delete('/api/v1/todos/:todo_id', (req, res, next) => pg.query('DELETE FROM items WHERE id=($1)', [req.params.todo_id])
    .then(() => pg.query('SELECT * FROM items ORDER BY id ASC'))
    .then(({ rows }) => res.json(rows))
    .catch(e => console.log(e) || res.status(500).json({success: false, data: e})));

module.exports = router;
