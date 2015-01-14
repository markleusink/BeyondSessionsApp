module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/* <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd h:MM") %> */\n',
    clean: ["build"],
    copy: {
      main: {
        files: [
          {expand: true, src: [
            'client/images/connected.png',
            'client/images/mark.jpg',
            'client/images/marky.jpg',
            'client/images/m-swball.gif',
            'client/images/beer.jpeg'
          ], 
          dest: 'build/client/images', flatten : true},
          {expand: true, src : [
           'client/bower_components/font-awesome/fonts/*',

            ], dest : 'build/client/fonts', flatten : true}
          ]
        }
    },

    /*create Angular JS files from the partials (html files)*/
    html2js : {
      options: {
        base : 'client'
    },
      main: {
        src: ['client/partials/*.html'],
        dest: 'client/templates.js'
      }
    },

    concat: {
      styles: {
        options: { banner: '<%= banner %>' },
        src: [
           'client/bower_components/bootswatch/united/bootstrap.min.css',
          'client/styles.css',
          'client/bower_components/font-awesome/css/font-awesome.min.css',
          'client/bower_components/animate.css/animate.min.css'
       ],
       dest: 'build/client/css/styles-all.css'
      },
      js: {
        options: { banner: '<%= banner %>' },
         src: [
        
          "client/bower_components/angular/angular.min.js",

          "client/polyfills.js",
          "client/app.js",
          "client/utils.js",
          "client/services.js",
          "client/sessions.js",
          "client/templates.js",

          "client/bower_components/angular-animate/angular-animate.min.js",
          "client/bower_components/angular-resource/angular-resource.min.js",
          "client/bower_components/angular-ui-router/release/angular-ui-router.min.js",
          "client/bower_components/angular-local-storage/dist/angular-local-storage.min.js",

          "client/bower_components/angular-bootstrap/ui-bootstrap.min.js",
          "client/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js",

          "client/bower_components/fastclick/lib/fastclick.js"

         ],
         dest: 'build/client/libs.js'
      }
    },

    watch : {
      scripts: {
        files: ['**/*.js', '**/*.html'],
        tasks: ['default'],
        options: {
          spawn: false,
        }
      }
    }
    
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s)
  grunt.registerTask('default', [
    'copy',
    'concat:styles',
    'concat:js',
    'html2js'
    ]);

};