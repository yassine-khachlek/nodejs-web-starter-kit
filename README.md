# Nodejs Web Starter Kit

[![Build Status](https://travis-ci.org/yassine-khachlek/nodejs-web-starter-kit.svg?branch=master)](https://travis-ci.org/yassine-khachlek/nodejs-web-starter-kit)

## Note

Under development.

## Download
```
git clone https://github.com/yassine-khachlek/nodejs-web-starter-kit
```

## Install

```
cd nodejs-web-starter-kit

sudo npm install
```

### Note

This step is required if you see that public/components folder is empty or missing, in a normal situation, and specially for deploying in heroku, NPM run the postinstall script to execute local Bower module, but because i experienced sometimes a problem due the NPM that execute the postinstall script before the Bower module installation.

```
./node_modules/bower/bin/bower --allow-root install

or if you have bower installed globally:

bower install
```

## Run

```
node bin/www
```

## Use

Navigate to [http://localhost:3000](http://localhost:3000).

See [http://localhost:3000/routes](http://localhost:3000/routes) for available routes.

# Used libraries

## Backend

    express
    jade
    passport
    mongoose

## Front End

	bootstrap
	jquery
	Chart.js

## TODO

	- Use AngularJS framework for the front-end
