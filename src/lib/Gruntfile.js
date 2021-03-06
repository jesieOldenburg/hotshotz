module.exports = function(grunt) {
    grunt.initConfig({
        browserify: {
            js: {
                src: ['../js/main.js'],
                dest: '../../dist/app.js'
            },
            options: {
                browserifyOptions: {
                    paths: ["./node_modules"]
                }
            }
        },
        // babel: {
        //     options: {
        //         sourceMap: true,
        //         presets: ['@babel/preset-env']
        //     },
        //     dist: {
        //         files: [{
        //             expand: true,
        //             cwd: '../js/',
        //             src: ['*.js'],
        //             dest: '../../dist/',
        //             ext: '.js'
        //         }]
        //     }
        // },
        jshint: {
            files: ['../js/**/*.js'], //location of javascript files
            options: {
                predef: ["document", "console", "$"], //allows for predefined things not found in js
                esnext: true, //allows for ES6
                globalstrict: true,
                browserify: true
            }
        },
        sass: { //setup sass compilation
            dist: {
                files: [{
                    expand: true,
                    cwd: '../styles/scss',
                    src: ['*.scss'],
                    dest: '../../dist/',
                    ext: '.css'
                }]
            }
        },
        copy: {
            main: {
                files: [{
                        expand: true,
                        cwd: '../html/',
                        src: ['*.html'],
                        dest: '../../dist/html/',
                        ext: '.html'
                    },
                    {
                        expand: true,
                        cwd: '../imgs/',
                        src: ['*.jpg'],
                        dest: '../../dist/img/',
                        ext: '.jpg'
                    }
                ]
            }
        },
        watch: { //automatically watch for changes
            javascripts: {
                files: ['../js/**/*.js', './Gruntfile.js'],
                tasks: ['jshint']
            },
            sass: {
                files: ['../styles/scss/**/*.scss'],
                tasks: ['sass']
            },
            browserify: {
                files: ['../js/**/*.js'],
                tasks: ['browserify']
            },
            copy: {
                files: ['../html/**/*.html'],
                tasks: ['copy'],
                options: {
                    event: ['all'],
                }
            }
        }
    });
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.registerTask('default', ['jshint', 'browserify', 'sass', 'copy', 'watch']);
};