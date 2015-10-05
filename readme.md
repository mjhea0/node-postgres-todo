# PostgreSQL and NodeJS

Check out the blog post >> http://mherman.org/blog/2015/02/12/postgresql-and-nodejs

This is a basic single page application built with Node, Express, Angular, and PostgreSQL.

## Quick Start

1. Clone the repo
1. Install dependencies: `npm install`
1. Start your Postgres server and create a database called "todo"
1. Create the database tables: `node server/models/database.js`
1. Start the server: `$ npm start`

## Tests

This comes with a load test using [Apache Bench](http://httpd.apache.org/docs/2.2/programs/ab.html) that by default exercises the API endpoint for the `/api/v1/todos` service:

```sh
sh tests/load-test.sh
```

Using this load test it is possible to verify several things:

- that the database is using as many connections as expected (it polls
  PostgreSQL for the number of active connections while it runs)
- the performance of the combined system under different loads

See the comments in the [script](https://github.com/mjhea0/node-postgres-todo/blob/master/test/load-test.sh) for more information.

