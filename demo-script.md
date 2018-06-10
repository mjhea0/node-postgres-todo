## Setup project to ready for Heroku

- nvm/npm
- clone repo
- update dependencies
- pull a postgres image
- run postgres image, remember to expose port on localhost
- psql -U ... -h ...
- create a db (chicken/egg problem if you don't create the DB first...)
- setup .env file
- install db-migrate (supports DATABASE_URL + dotenv) + db-migrate-pg
- install heroku cli
- npm start - oops no schema
- npm release (builds local schema)
- npm start

## Create our first app

- create app (shefdevops-todo-staging)
- add a postgres db
- enable automatic deploys (doesn't bootstrap)
- deploy
- show build log, release log, and app

## Create a pipeline

- add to a pipeline (shefdevops-demo)
- add a production app (shefdevops-todo-prod)
- add postgres DB
- deploy

## Release a change

- enable review apps (note app.json)
- fetch; create new branch with new /api/v1/environment endpoint
- push; create PR
- note review app; deploy it
- note endpoint doesn't know what env it is - add TODO_ENV environment variable
- merge PR; show review app is gone, and staging is deploying
- add TODO_ENV to staging
- show
- add TODO_env to production
- Promote; show endpoint works

## DONE!
