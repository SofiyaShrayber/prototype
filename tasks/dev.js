'use strict';
module.exports = function(grunt) {
    grunt.registerTask('dev', '', function (target) {

        if (target === undefined) {
            target = grunt.file.expand('./src/*')[0].replace('./src/','');
        }

        grunt.config.set('project.dir', target);

        grunt.task.run([
            'clean:dev',
            'compass:' + target,
            'copy:' + target,
			'connect:dev',
            'watch',
		]);
	});
};
