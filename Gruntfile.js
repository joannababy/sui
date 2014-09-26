module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> | <%= pkg.author %> | <%= pkg.repository.url %> */\n'
            },
            css: {
                src: ['src/css/*.css'],
                dest: 'dist/css/sui.css'
            }
        },
        cssmin: {
            minify: {
                files: [{
                    expand: true,
                    src: 'dist/css/sui.css',
                    ext: '.min.css'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['concat', 'cssmin']);

};