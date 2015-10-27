'use strict';
module.exports = function(grunt) {
    grunt.registerTask('build', function () {

        grunt.task.run('clean:dist');

        grunt.file.expand('./src/*').forEach(function(path) {
            grunt.task.run('compass:' + path.replace('./src/',''));
        });

        grunt.task.run('copy:dist');
    });
};
