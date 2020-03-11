// Back end grunt tasks
module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Js hint
		jshint: {
			all: ['Gruntfile.js', 'js/*.js']
		}
		
		// watch task
		watch : {
			scripts : {
				files : ['js/*.js'],
				tasks : ['jshint'],
				options : false,
			},
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	// Default task(s).
};