# PostgreSQL and NodeJS

Check out the blog post >> http://mherman.org/blog/2015/02/12/postgresql-and-nodejs

This is a basic single page application built with Node, Express, Angular, and PostgreSQL.

## Quick Start

1. Clone the repo
1. Install dependencies: `$ npm install`
1. Start your Postgres server and create a database called "todos"
1. Create the database tables: `$ npm run db-migrate up`
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

## Running on Heroku

Files are provided to run this app on Heroku.
- `Procfile` - configures the app and release task that migrates the associated database
- `app.json` - configures the app Heroku CI, to run tests automatically as needed

## Using a Dockerized PostgreSQL server

If you have docker installed, you can run your PostgreSQL database in a container.
The following command will run a database at the latest PostgreSQL version.

`docker run --rm -p"5432:5432" -e POSTGRES_PASSWORD=ppp -d postgres`

Your host port `5432` to the containers port `5432`, so it will appear as if you have a local PostgreSQL install.
The password will be "ppp".
The `--rm` flag deletes the container when you shut it down - leave the flag off to keep it around.
