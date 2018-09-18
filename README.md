# International Waste Shipments Frontend Training

| Branch  | Travis CI |
| ------------- | ------------- |
| master  | [![Build Status](https://travis-ci.com/DEFRA/international-waste-shipments-frontend-training.svg?branch=master)](https://travis-ci.com/DEFRA/international-waste-shipments-frontend-training)   |
| develop | [![Build Status](https://travis-ci.com/DEFRA/international-waste-shipments-frontend-training.svg?branch=develop)](https://travis-ci.com/DEFRA/international-waste-shipments-frontend-training)  |

This repository provides a Node.js based solution for the frontend of the [International Waste Shipments service](https://github.com/DEFRA/prsd-iws).
This solution exists for training purposes. The structure of this repository is based on that of [Defra Hapi web boilerplate](https://github.com/DEFRA/hapi-web-boilerplate).

## Environment variables

| name     | description      | required | default |            valid            | notes |
|----------|------------------|:--------:|---------|:---------------------------:|-------|
| NODE_ENV | Node environment |    no    |         | development,test,production |       |
| PORT     | Port number      |    no    | 3000    |                             |       |

## Prerequires

Node v8+


# Running the application

First build the application using:

`$ npm run build`

Currently this will just build the `govuk-frontend` sass but may be extended to include other build tasks as needed (e.g. client-side js using browserify or webpack etc.)

Now the application is ready to run:

`$ node index.js`


## Contributing to this project

If you have an idea you'd like to contribute please log an issue.

All contributions should be submitted via a pull request.

## License

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

[http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3](http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3)

The following attribution statement MUST be cited in your products and applications when using this information.
