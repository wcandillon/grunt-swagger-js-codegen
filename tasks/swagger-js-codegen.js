module.exports = function (grunt) {
    'use strict';

    grunt.registerMultiTask('swagger-js-codegen', 'Swagger codegen for Javascript', function(){
        var fs = require('fs');
        var CodeGen = require('swagger-js-codegen').CodeGen;
        var options = this.options();
        var dest = options.dest;
        options.apis.forEach(function(api){
            var swagger = JSON.parse(fs.readFileSync(api.swagger));
            var source = api.angularjs === true ? CodeGen.getAngularCode({ moduleName: api.moduleName, className: api.className, swagger: swagger }) : CodeGen.getNodeCode({ className: api.className, swagger: swagger });
            grunt.log.writeln('Generated ' + api.fileName + ' from ' + api.swagger);
            fs.writeFileSync(dest + '/' + api.fileName, source, 'UTF-8');
        });
    });
};
