
module.exports = function(grunt) {
	
  // Project configuration.
  grunt.initConfig({
	  
	pkg: grunt.file.readJSON('package.json'),
	
	copy: {
	    pluginJs: {
		    src: 'src/js/SVGProgressCircle.js',
		    dest: 'build/js/nowaypoints.SVGProgressCircle.js'
	    },
		pluginCss: {
			src: 'src/css/SVGProgressCircle.css',
			dest: 'build/css/SVGProgressCircle.css',
		},
	    demoJs: {
		    src: 'build/js/SVGProgressCircle.js',
		    dest: 'demo/js/SVGProgressCircle.js'
	    },
	    demoCss: {
		    src: 'build/css/SVGProgressCircle.css',
		    dest: 'demo/css/SVGProgressCircle.css'
	    }
	},
	
    concat: {
	    pluginJs: {
		    src: ['src/js/libs/waypoint.js', 'src/js/SVGProgressCircle.js'],
		    dest: 'build/js/SVGProgressCircle.js'
	    },
	    demoJs: {
		    src: ['demo/js/SVGProgressCircle.js', 'demo/js/smooth-scroll.js'],
		    dest: 'demo/scripts.js'
	    },
	    demoCss: {
		    src: ['demo/css/*.css'],
		    dest: 'demo/style.css'
	    }
    },
    
    uglify: {
    	pluginJs: {
	    	files: [{
		    	expand: true,
		    	cwd: 'build/js',
		    	src: ['*.js', '!*.min.js'],
		    	dest: 'build/js',
		    	ext: '.min.js',
		    	extDot: 'last'
	    	}]
    	},
	    demoJs: {
		    src: 'demo/scripts.js',
		    dest: 'demo/scripts.min.js'
	    }
    },
    
    cssmin: {
	    pluginCss: {
		    src: 'build/css/SVGProgressCircle.css',
		    dest: 'build/css/SVGProgressCircle.min.css'
	    },
	    demoCss: {
		    src: 'demo/style.css',
		    dest: 'demo/style.min.css'
	    }
    },

	watch: {
		pluginJs: {
		    files: ['src/js/SVGProgressCircle.js'],
		    tasks: ['pluginJs', 'demoJs']
		},
		pluginCss: {
		    files: ['src/css/SVGProgressCircle.css'],
		    tasks: ['pluginCss']
		},
		demoCss: {
		    files: ['demo/css/*.css'],
		    tasks: ['pluginCss', 'demoCss']
		}
  	}
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  grunt.loadNpmTasks('grunt-contrib-concat');
  
  grunt.loadNpmTasks('grunt-contrib-copy');
  
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.registerTask('pluginJs', ['copy:pluginJs', 'concat:pluginJs', 'uglify:pluginJs']);

  grunt.registerTask('pluginCss', ['copy:pluginCss', 'cssmin:pluginCss']);

  // Build demo.
  grunt.registerTask('demoJs', ['copy:demoJs', 'concat:demoJs', 'uglify:demoJs']);
  
  grunt.registerTask('demoCss', ['copy:demoCss', 'concat:demoCss', 'cssmin:demoCss']);

  // Default task(s).
  grunt.registerTask('default', ['watch']);

};