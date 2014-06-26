#Grunt Task for Swagger JS Codegen

[![Build Status](http://img.shields.io/travis/wcandillon/grunt-swagger-js-codegen/master.svg?style=flat)](https://travis-ci.org/wcandillon/grunt-swagger-js-codegen) [![NPM version](http://img.shields.io/npm/v/grunt-swagger-js-codegen.svg?style=flat)](http://badge.fury.io/js/grunt-swagger-js-codegen) [![Code Climate](http://img.shields.io/codeclimate/github/wcandillon/grunt-swagger-js-codegen.svg?style=flat)](https://codeclimate.com/github/wcandillon/grunt-swagger-js-codegen)

##Examples
###Nodejs generation
[See example.](https://github.com/28msec/28.io-nodejs/blob/master/Gruntfile.js#L11)
```javascript
    grunt.initConfig({
        'swagger-js-codegen': {
            options: {
                apis: [
                    {
                        swagger: 'swagger/_queries',
                        fileName: 'queries.api.28.io.js',
                        className: 'Queries'
                dest: 'lib'
            },
            dist: {

            }
        },
```

###Angularjs generation
[See example.](https://github.com/28msec/28.io-angularjs/blob/master/Gruntfile.js#L27)
```javascript
    grunt.initConfig({
        'swagger-js-codegen': {
            options: {
                apis: [
                    {
                        swagger: 'swagger/_queries',
                        fileName: 'queries.api.28.io.js',
                        className: 'Queries',
                        moduleName: 'queries.api.28.io.js',
                        angularjs: true
                dest: 'lib'
            },
            dist: {

            }
        },
```

