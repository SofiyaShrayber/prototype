'use strict';

/* HELPER FUNCTIONS: ----------------------------------------------------- */

// config file loader helper
var loadConfig = function(path) {
    var glob = require('glob');
    var object = {};
    var key;
    glob.sync('*', { cwd: path }).forEach(function(option) {
        key = option.replace(/\.js$/, '');
        object[key] = require(path + option);
    });
    return object;
};

module.exports = function(grunt) {

    /* LOAD CONFIG: ------------------------------------------------------ */

    var config = {
        pkg: grunt.file.readJSON('package.json'),
        env: process.env,

        project: {
            src:  'src',
            dist: 'build',
            temp: '.tmp',
            js: {
                dir:   'js',
                files: '{,**/}*.js'
            },
            img: {
                dir:   'img',
                files: '<%= project.img.dir %>/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
            },
            css: {
                dir:   'css',
                files: '<%= project.css.dir %>/{,*/}*.css'
            },
            sass: {
                dir:   'scss',
                files: '<%= project.sass.dir %>/{,**/}*.{scss,sass}'
            },
            fonts: {
                dir: 'fonts',
                files: '<%= project.fonts.dir %>/{,**/}*.{eot,ott,svg,ttf,woff}'
            },
            html: {
                files: '{,**/}*.html'
            }
        },

        compass: {},
    };

    grunt.util._.extend(config, loadConfig('./tasks/config/'));
    grunt.initConfig(config);

    grunt.file.expand('src/*').forEach(function(path) {
        var task = path.replace('src/','');
 
        config.compass[task] = {
            options: {
                sassDir: path + '/<%=project.sass.dir %>',
                cssDir: path + '/<%=project.css.dir %>',
                javascriptsDir: path + '/<%= project.js.dir %>',
                relativeAssets: false,
                assetCacheBuster: false,
                environment: 'development'
            }
        };

        config.copy[task] = {
            expand: true,
            dot: true,
            cwd: path,
            src: [
                '<%= project.html.files %>',
                '<%= project.img.files %>',
                '<%= project.js.files %>',
                '<%= project.css.files %>',
                '<%= project.fonts.files %>'
            ],
            dest: '<%= project.temp %>'
        };
    });


    /* LOAD NPM TASKS: --------------------------------------------------- */

    require('load-grunt-tasks')(grunt);

    require('time-grunt')(grunt);


    /* REGISTER PROJECT TASKS: ------------------------------------------- */

    grunt.loadTasks('tasks');

    grunt.registerTask('default', ['dev']);
};
