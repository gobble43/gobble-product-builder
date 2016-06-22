[![Build Status](https://travis-ci.org/gobble43/gobble-product-builder.svg?branch=master)](https://travis-ci.org/gobble43/gobble-product-builder)

[![Stories in Ready](https://badge.waffle.io/gobble43/gobble-product-builder.png?label=ready&title=Ready)](https://waffle.io/gobble43/gobble-product-builder)

# Microservice Name
gobble-product-builder

## Table of Contents
1. [Getting started](#getting-started)
2. [Tech](#tech)
3. [Database Schema](#database-schema)
4. [Team](#team)
5. [Contributing](#contributing)

## Getting started

Clone and install dependencies:
```sh
$ git clone https://github.com/gobble43/gobble-product-builder.git
$ cd gobble-product-builder
$ npm install
```
Create `env/development.env` and set environment variables. Follow `env/example.env`.

add any additional needed commands and instructions here

```sh
$ npm start
```

#### Testing

Configure the environment variable `NODE_ENV` prior to running tests.

 ```sh
$ export NODE_ENV=development
$ npm test
```

## Tech
> node / express server
> node clusters for workers
> redis for worker queues
> superagent for sending get and post requests

## Database Schema
> Add schema for application db here

## Directory Layout
> Use the diagram below as an example and starting point
```
├── /env/                       # Environment variables
├── /node_modules/              # 3rd-party libraries and utilities
├── /dist/                      # Public distribution folder
│   ├── /images/                # Images
│   ├── /compressedImages/      # Compressed Images
│
├── /server/                    # Server source code
│   ├── /httpServer/            # Express server
│     ├── /config/              # Server configs
│       ├── middleware.js       # Server middleware
│       ├── routes.js           # Server routes
│     ├── server.js             # Start the server
│   ├── /productDataWorker/     # Worker that gets data on certain product by its upc
│       ├── worker.js           # Start worker
│   ├── /imageWorker/           # Worker that looks for high traffic photos and compresses, checks for nudity and uploads to s3
│       ├── worker.js           # Start worker
│   ├── master.js               # Start entire server, with product data worker and image worker
│
├── /test/                      # Server and client side tests
│   ├── /client/                # Client side tests
│   ├── /server/                # Server side tests
│   ├── /data/                  # Holds seed & dummy data
└── package.json                # List of 3rd party libraries and utilities to be installed
└── .eslintrc.json              # ESLint settings
```

## Team
  - Product Owner:            [Leo Adelstein](https://github.com/leoadelstein)
  - Scrum Master:             [Jack Zhang](https://github.com/jackrzhang)
  - Development Team Members: [Leo Adelstein](https://github.com/leoadelstein), [Jinsoo Cha](https://github.com/jinsoocha), [Will Tang](https://github.com/willwtang/shortly-deploy), [Jack Zhang](https://github.com/jackrzhang)

## Contributing
See [CONTRIBUTING.md](https://github.com/gobble43/docs/blob/master/STYLE-GUIDE.md) for contribution guidelines.