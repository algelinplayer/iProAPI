# Image Processing API (iPro API)

This repository contains the "Image Processing API" app.

## Installing

`npm install` to resolve dependencies

*All the images are in the `assets/images` directory.*

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm run jasmine` to execute the unit tests via [Jasmine](https://github.com/jasmine/jasmine).

*Run `npm run test` to build the project and then execute the unit tests.*


## Development server (Running)

Run `npm run start` for a dev server using [Nodemon](https://github.com/remy/nodemon).

or

Run `node dist/index` for a dev server.

Then, call the API passing the query parameters `filename`, `width` and `height`, for example:

`http://localhost:3000?filename=icelandwaterfall.jpg&width=300&height=300`


