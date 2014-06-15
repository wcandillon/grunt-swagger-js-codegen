module.exports = function (grunt) {
    'use strict';

    grunt.registerMultiTask('swagger-js-codegen', 'Swagger codegen for Javascript', function(){
        var fs = require('fs');
        var CodeGen = require('wagger-js-codegen').CodeGen;
        var options = this.options();
        options.apis.forEach(function(api){
            var dest = options.dest;
            var swagger = JSON.parse(fs.readFileSync(api.swagger));
            var gen = new CodeGen(api.className, swagger);
            var source = gen.getCode();
            fs.writeFileSync(dest + '/' + api.className + '.js', source, 'UTF-8');
        });
    });
};