module.exports = function (grunt) {
    'use strict';

    grunt.registerMultiTask('swagger-js-codegen', 'Swagger codegen for Javascript', function(){
        var fs = require('fs');
        var CodeGen = require('swagger-js-codegen').CodeGen;
        var request = require('request');
        var Q = require('q');
        var _ = require('lodash');

        var options = this.options();
        var dest = options.dest;
        var promises = [];
        var done = this.async();

        grunt.file.mkdir(dest);
        options.apis.forEach(function(api){
            var deferred = Q.defer();
            if(api.swagger.substring(0, 'http://'.length) === 'http://' || api.swagger.substring(0, 'https://'.length) === 'https://') {
                request({
                    uri: api.swagger,
                    method: 'GET'
                }, function(error, response, body){
                    if(error || response.statusCode !== 200) {
                        deferred.reject('Error while fetching ' + api.swagger + ': ' + (error || body));
                    } else {
                        var swagger = JSON.parse(body),
                            source = null;

                        if (api.type === 'angular') {
                            source = CodeGen.getAngularCode({ moduleName: api.moduleName, className: api.className, swagger: swagger });
                        } else if (api.type === 'node') {
                            source = CodeGen.getNodeCode({ className: api.className, swagger: swagger });
                        } else {
                            source = CodeGen.getCustomCode({ className: api.className, template: api.template, swagger: swagger });
                        }
                        grunt.log.writeln('Generated ' + api.fileName + ' from ' + api.swagger);
                        fs.writeFileSync(dest + '/' + api.fileName, source, 'UTF-8');
                        deferred.resolve();
                    }
                });
            } else {
                fs.readFile(api.swagger, 'UTF-8', function(err, data){
                    if(err) {
                        deferred.reject(err);
                    } else {
                        var swagger = JSON.parse(data),
                            source = null;

                        if (api.type === 'angular') {
                            source = CodeGen.getAngularCode({ moduleName: api.moduleName, className: api.className, swagger: swagger });
                        } else if (api.type === 'node') {
                            source = CodeGen.getNodeCode({ className: api.className, swagger: swagger });
                        } else {
                            source = CodeGen.getCustomCode({ className: api.className, template: api.template, swagger: swagger });
                        }
                        grunt.log.writeln('Generated ' + api.fileName + ' from ' + api.swagger);
                        fs.writeFileSync(dest + '/' + api.fileName, source, 'UTF-8');
                        deferred.resolve();
                    }
                });
            }
            promises.push(deferred.promise);
        });
        Q.all(promises).then(function(){
            done();
        }).catch(function(error){
            var e;
            if(_.isObject(error) && error.body) {
                e = JSON.stringify(error.body, null, 2);
            } else if(_.isObject(error)) {
                e = JSON.stringify(error, null, 2);
            } else if(error instanceof Error || _.isString(error)) {
                e = error;
            } else {
                e = new Error('Unknown error');
            }
            grunt.fail.fatal(e);
        });
    });
};
