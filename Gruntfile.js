module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.homepage %> */\n'
        },
        unwrap: {
            options: {
                base: './src/js/',
                globalBase: './lib',
                name: 'SUI',
                namespace: 'window',
                banner: '<%= meta.banner %>'
            },
            'dialog.js': {
                src: './src/js/dialog.js',
                dest: './dist/js/dialog.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-unwrap');
    grunt.registerTask('default', ['unwrap']);

};