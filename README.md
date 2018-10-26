# International Waste Shipments Frontend Training

| Branch  | Travis CI |
| ------------- | ------------- |
| master  | [![Build Status](https://travis-ci.com/DEFRA/international-waste-shipments-frontend-training.svg?branch=master)](https://travis-ci.com/DEFRA/international-waste-shipments-frontend-training)   |
| develop | [![Build Status](https://travis-ci.com/DEFRA/international-waste-shipments-frontend-training.svg?branch=develop)](https://travis-ci.com/DEFRA/international-waste-shipments-frontend-training)  |

[![Maintainability](https://api.codeclimate.com/v1/badges/97e9e84c5bcc0f5900ac/maintainability)](https://codeclimate.com/github/DEFRA/international-waste-shipments-frontend-training/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/97e9e84c5bcc0f5900ac/test_coverage)](https://codeclimate.com/github/DEFRA/international-waste-shipments-frontend-training/test_coverage)

This repository provides a Node.js based solution for the frontend of the [International Waste Shipments service](https://github.com/DEFRA/prsd-iws).
This solution exists for training purposes. The structure of this repository is based on that of [Defra Hapi web boilerplate](https://github.com/DEFRA/hapi-web-boilerplate).

## Environment variables

| name                                  | description                   | required |          default             |            valid            |
|---------------------------------------|-------------------------------|:--------:|-----------------------------:|----------------------------:|
| NODE_ENV                              | Node environment              |    no    |                              | development,test,production |
| PORT                                  | Port number                   |    no    | 3000                         |                             |
| IWS_NOTIFICATION_SERVICE              | Notification service URL      |    yes   |                              |                             |
| IWS_SESSION_COOKIE_NAME               | Session cookie name           |    no    | iwsSessionCookie             |                             |
| IWS_SESSION_TIMEOUT_IN_MINUTES        | Session timeout length        |    no    | 15                           |                             |
| IWS_REQUEST_TIMEOUT_IN_MILLIS         | Request timeout               |    no    | 5000                         |                             |
| IWS_SESSION_CACHE_NAME                | Session cache name            |    no    | redis-cache                  |                             |
| IWS_SESSION_CACHE_HOST                | Session cache hostname        |    no    | localhost                    |                             |
| IWS_SESSION_CACHE_CONTAINER_PORT      | Session cache Docker port     |    no    | 6379                         |                             |
| IWS_SESSION_CACHE_PORT                | Session cache port            |    no    | 6379                         |                             |
| IWS_SESSION_CACHE_GUI_CONTAINER_PORT  | Session cache GUI Docker port |    no    | 8081                         |                             |
| IWS_SESSION_CACHE_GUI_PORT            | Session cache GUI port        |    no    | 8081                         |                             |
| IWS_SESSION_CACHE_PASSWORD            | Session cache password        |    yes   |                              |                             |

## Prerequires

### Mandatory

* Node 8.x or above
* Redis 5.x or above (Host or Docker based)

### Optional

If using Docker

* Docker 18.06 CE or above
* Docker Compose 1.22 or above

## Running the application

First build the application using:

`$ npm run build`

Currently this will just build the `govuk-frontend` sass but may be extended to include other build tasks as needed (e.g. client-side js using browserify or webpack etc.)

Now the application is ready to run:

`$ node index.js`

## Docker Considerations

### Introduction

This service uses Redis for intermediate storage. The following Docker Compose files provide Docker based Redis support for use in a local development
environment.

* docker-compose.yaml - Provides Docker containers for Redis and Redis Commander
* docker-compose.volumes.yml - This can be used to supplement the Redis Docker container with volume support. Support is provided for a
  custom Redis configuration file volume and a data volume.

### Running Unit Tests With Docker Based Redis

`$ docker-compose up -d && npm test && docker-compose down`

### Running Docker Based Redis With Volumes

`$ mkdir -p volumes/redisconf && mkdir -p volumes/redisdata`

`$ cp <</path/to/redis.conf>> volumes/redisconf/redis.conf`

`$ docker-compose -f docker-compose.yml -f docker-compose.volumes.yml up -d`

## Contributing to this project

If you have an idea you'd like to contribute please log an issue.

All contributions should be submitted via a pull request.

## License

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

[http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3](http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3)

The following attribution statement MUST be cited in your products and applications when using this information.
