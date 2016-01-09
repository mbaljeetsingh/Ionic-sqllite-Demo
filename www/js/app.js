// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var db = null;

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    // window.plugins.sqlDB.copy("populated.db", function() {
    //         db = $cordovaSQLite.openDB("populated.db");
    //     }, function(error) {
    //         console.error("There was an error copying the database: " + error);
    //         db = $cordovaSQLite.openDB("populated.db");
    //     });

    if(window.cordova) {
      // App syntax
      db = window.sqlitePlugin.openDatabase( {name: "mydb.db", createFromLocation: 1} );
      // db = $cordovaSQLite.openDB("myapp.db");
    } else {
      // Ionic serve syntax
      db = window.openDatabase("myapp.db", "1.0", "My app", -1);
    }

    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS team (id integer primary key, name text)");
    // $cordovaSQLite.execute(db, "DROP TABLE dict");

  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

    .state('app.team', {
    url: '/team',
    views: {
      'menuContent': {
        templateUrl: 'templates/team.html',
        controller: 'TeamCtrl'
      }
    }
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/team');
});
