# Martian-library

GraphQL introduction tutorial from EvilMartians team.  
Tutorial consist of three parts:
- [From zero to the first query](https://evilmartians.com/chronicles/graphql-on-rails-1-from-zero-to-the-first-query) — setting up a project, adding first queries to both back-end and front-end applications. :heavy_check_mark:
- [Updating the data](https://evilmartians.com/chronicles/graphql-on-rails-2-updating-the-data) — adding mutations. :heavy_check_mark:
- [On the way to perfection](https://evilmartians.com/chronicles/graphql-on-rails-3-on-the-way-to-perfection) — adding subscriptions, and some refactoring.

## How to run on local machine

You need [nodejs](https://nodejs.org/en/download/) and [yarn](https://yarnpkg.com/lang/en/docs/install) installed.

Run `yarn && bundle && rails s` to make the magic happen.

## How to run with Docker

You need `docker` and `docker-compose` installed (for MacOS just use [official app](https://docs.docker.com/engine/installation/mac/)).

## Provisioning

Run the following commands to prepare your Docker dev env:

```sh
$ docker-compose build
$ docker-compose run runner yarn install
$ docker-compose run runner ./bin/setup
```

It builds the Docker image, installs Ruby and NodeJS dependencies, creates database, run migrations and seeds.

You're all set! Now you're ready to code!

## Commands

- Running the app:

You can run the Rails up using the following command:

```sh
$ docker-compose up rails
```

If you want to run Webpack Dev server as well:

```sh
$ docker-compose up rails webpacker
```
