// Front end grant tasks
module.exports = function(grunt) {
	
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		// Jshint
		jshint: {
			all: ['Gruntfile.js', 'js/*.js']
		}

		// 
		
		// watch task
		watch : {
			scripts : {
				files : ['js/*.js'],
				tasks : ['jshint'],
				options : false,
			},
		}

	}); // end of gruntInit


	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	// Default task(s).
};