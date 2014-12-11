var path = require('path');


module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: [
        'Gruntfile.js',
        'hoodie.paranoia.js',
        'index.js',
        'lib/*.js',
        'hooks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    simplemocha: {
      options: {
        ui: 'tdd',
        trace: true
      },
      unit: {
        src: ['test/unit/*.js']
      }
    },

    mocha_browser: {
      all: {options: {urls: ['http://localhost:<%= connect.options.port %>']}}
    },

    shell: {
      removeData: {
        command: 'rm -rf ' + path.resolve(__dirname, 'data')
      },
      removeEmails: {
        command: 'rm -rf ' + path.resolve(__dirname, 'test/browser/emails')
      },
      npmLink: {
        command: 'npm link && npm link <%= pkg.name %>'
      },
      npmUnlink: {
        command: 'npm unlink && npm unlink <%= pkg.name %>'
      },
      installPlugin: {
        command: 'hoodie install <%= pkg.name.replace("hoodie-plugin-", "") %>'
      },
      removePlugin: {
        command: 'hoodie uninstall <%= pkg.name.replace("hoodie-plugin-", "") %>'
      },
      killHoodie: {
        command: 'pkill -f hoodie-plugin-users'
      }
    },

    hoodie: {
      start: {
        options: {
          www: 'test/browser',
          callback: function (config) {
            grunt.config.set('connect.options.port', config.stack.www.port);
          }
        }
      }
    },

    fakesmtp: {
      test: {
        options: {
          dir: path.resolve(__dirname, 'test/browser/emails'),
          port: 8888
        }
      }
    },

    env: {
      test: {
        HOODIE_SETUP_PASSWORD: 'testing'
      }
    },

    clean: {
      dist: ['.tmp', 'admin-dashboard/*'],
      server: '.tmp'
    },


    watch: {
      livereload: {
        files: [
          'app/*.html',
          '{.tmp,app}/styles/**/*.css',
          '{.tmp,app}/scripts/**/*.js',
          'app/images/**/*.{png,jpg,jpeg,webp}'
        ],
        tasks: ['livereload']
      },
      jshint: {
        files: ['<%= jshint.files %>'],
        tasks: 'jshint'
      },
      unittest: {
        files: ['index.js', 'lib/*.js'],
        tasks: 'test:unit'
      }
    }

  });

  // custom tasks
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('test:unit', ['simplemocha:unit']);
  grunt.registerTask('test:browser', [
    'env:test',
    'shell:removeData',
    'shell:removeEmails',
    'shell:npmLink',
    'shell:installPlugin',
    'hoodie',
    'continueOn',
    'mocha_browser:all',
    'continueOff',
    'hoodie_stop',
    'shell:npmUnlink',
    'shell:removePlugin'
  ]);

  grunt.registerTask('default', []);
  grunt.registerTask('start', [
    'env:test',
    'shell:npmLink',
    'shell:installPlugin',
    'hoodie'
  ]);
  grunt.registerTask('stop', [
    'hoodie_stop',
    'shell:npmUnlink',
    'shell:removePlugin',
    'shell:killHoodie'
  ]);
  grunt.registerTask('test', [
    'jshint',
    'test:unit',
    'test:browser'
  ]);

  grunt.registerTask('server', [
    'clean:server',
    'livereload-start',
    'connect:livereload',
    'open',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    //'imagemin',
    'htmlmin',
    //'concat:generated',
    //'cssmin:generated',
    //'uglify:generated',
    'concat',
    'copy',
    'usemin'
  ]);

  grunt.registerTask('test:serve', [
    'jshint',
    'shell:removeData',
    'env:test',
    'shell:npmLink',
    'shell:installPlugin',
    'hoodie',
    'continueOn',
  ]);
  grunt.registerTask('test:stop', [
    'hoodie_stop',
    'shell:npmUnlink',
    'shell:removePlugin'
  ]);

};
