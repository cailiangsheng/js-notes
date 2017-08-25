module.exports = function (grunt) {
  grunt.registerTask('build', ['clean', 'less', 'cssmin', 'browserify', 'uglify', 'processhtml', 'htmlmin'])
  grunt.registerTask('dev', ['build', 'watch'])
  grunt.registerTask('test', ['mochaTest:test'])
  grunt.registerTask('default', ['build', 'test'])


  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      browserify: {
        options: {
          browserifyOptions: {
            debug: true
          },
          transform: [
            'stringify'
          ],
          external: [
            'angular'
          ]
        },
        dist: {
          files: {
            'dist/notes.js': ['src/controller.js', 'src/view/filter.js']
          },
          options: {
            browserifyOptions: {
              debug: true
            },
            transform: [
              'babelify'
            ],
            watch: true
          }
        }
      },

      uglify: {
        minify: {
          files: {
            'dist/notes.min.js': ['dist/notes.js']
          }
        }
      },

      less: {
        dist: {
          files: {
            'dist/notes.css': 'src/view/notes.less'
          }
        }
      },

      clean: {
        all: ['dist/*']
      },

      eslint: {
        options: {
          config: '.eslintrc'
        },
        files: ['src/**/*.js']
      },

      watch: {
        files: ['src/*.less', 'src/*.js', 'test/spec/*.js'],
        tasks: ['build', 'test'],
        options: {
          spawn: false,
          debounceDelay: 0,
          livereload: true
        }
      },

      cssmin: {
        dist: {
          expand: true,
          src: './dist/notes.css',
          ext: '.min.css'
        }
      },

      processhtml: {
        dev: {
          options: {
            process: true,
            strip: true
          },
          files: [{
            'dist/notes.html': ['src/notes.html']
          }]
        },
        dist: {
          options: {
            process: true,
            strip: true
          },
          files: [{
            'dist/notes.min.html': ['src/notes.html']
          }]
        }
      },

      htmlmin: {
        dist: {
          options: {
            removeComments: true,
            collapseWhitespace: true
          },
          files: [{
            'dist/notes.min.html': 'dist/notes.min.html'
          }]
        }
      },

      mochaTest: {
        test: {
          options: {
            reporter: 'spec',
            grep: grunt.option('grep')
          },
          src: ['./test/spec/*.js']
        }
      }
    }
  )

  grunt.loadNpmTasks('grunt-browserify')
  grunt.loadNpmTasks('grunt-contrib-less')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-cssmin')
  grunt.loadNpmTasks('grunt-processhtml')
  grunt.loadNpmTasks('grunt-contrib-htmlmin')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-eslint')
  grunt.loadNpmTasks('grunt-mocha-test')

}
