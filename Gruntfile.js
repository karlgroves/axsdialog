'use strict';

module.exports = function (grunt) {
    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // Show elapsed time at the end
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed MIT */\n',
        
        // Task configuration.
        clean: {
            files: ['dist']
        },

        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: 'src/axsdialog.js',
                dest: 'dist/axsdialog.min.js'
            }
        },

        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            gruntfile: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: 'Gruntfile.js'
            },
            src: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: ['src/**/*.js',]
            }
        },

        copy: {
            main: {
                files: [
                    // includes files within path

                    {expand: true, cwd: 'src', src: ['src/axsdialog.css'], dest: 'dist/axsdialog.css'}
                ]
            }
        },

        jsonlint: {
            configFiles: {
                src: ['bower.json', 'package.json', '.bowerrc', '.jshintrc']
            }
        },

        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            src: {
                files: '<%= jshint.src.src %>',
                tasks: ['jshint:src']
            }
        }
    });

    // Default task
    grunt.registerTask('default', ['jshint', 'clean', 'uglify', 'copy']);
};
