// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic',
  'ngCordova',
  'starter.controllers',
  'starter.services'
])

.run(function($ionicPlatform, $cordovaSQLite, $rootScope) {
  $ionicPlatform.ready(function () {

    var push = PushNotification.init({
        android: {
            senderID: "642908727095"
        }
    });

    push.on('registration', function(data) {
      console.log(data.registrationId);
    });

    push.on('notification', function(data) {
      console.log(data);
    });

    push.on('error', function(e) {
      console.log(e.message);
    });

    $rootScope.db = $cordovaSQLite.openDB({
      name: "myusers.db",
      location: 'default',
      iosDatabaseLocation: 'Library'
    });

    var sqlCreateTable = 'CREATE TABLE IF NOT EXISTS ' +
      'users(id integer primary key, ' +
      'fullname text, position text, hospital text, image text)';

    var sqlDelete = 'DELETE FROM users';

    $cordovaSQLite.execute($rootScope.db, sqlCreateTable, [])
      // .then(function (res) {
      //   // success
      //   console.log('Create table success');
      //   return $cordovaSQLite.execute($rootScope.db, sqlDelete, []);
      // })
      .then(function (res) {
        //console.log('Delete success');
      }, function (err) {
        // error
        console.log('Error: ' + JSON.stringify(err));
      });

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

    // Each tab has its own nav history stack:

    .state('tab.dash', {
      url: '/dash', // /tab/dash
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'DashCtrl'
        }
      }
    })

    .state('tab.dash-new', {
      url: '/dash-new', // /tab/dash
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-new.html',
          controller: 'NewCtrl'
        }
      }
    })

    .state('tab.dash-detail', {
      url: '/detail/:id', // /tab/dash
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-detail.html',
          controller: 'DetailCtrl'
        }
      }
    })

    .state('tab.map', {
      url: '/map', // /tab/dash
      views: {
        'tab-map': {
          templateUrl: 'templates/tab-map.html',
          controller: 'MapCtrl'
        }
      }
    })

    .state('tab.setting', {
      url: '/setting',
      views: {
        'tab-setting': {
          templateUrl: 'templates/tab-setting.html'
        }
      }
    })

    .state('tab.setting-connection', {
      url: '/setting-connection',
      views: {
        'tab-setting': {
          templateUrl: 'templates/tab-setting-connection.html'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
