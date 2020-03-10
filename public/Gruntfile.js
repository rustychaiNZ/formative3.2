module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: '/css',
          src: ['*.css', '!*.min.css'],
          dest: '/css',
          ext: '.min.css'
        }]
      }
    },
    csslint: {

      lax: {
        options: {
          import: false,
          'order-alphabetical' :false
        },
        src: ['css/*.css','!*.min.css']
      }
    },
    htmllint: {
      all: ['/*.html']
      }
    });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-html');




  // Default task(s).
  grunt.registerTask('default', ['cssmin', 'csslint', 'htmllint']);

};
