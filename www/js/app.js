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

    $rootScope.db = $cordovaSQLite.openDB({
      name: "users.db",
      location: 'default',
      iosDatabaseLocation: 'Library'
    });

    var sql = 'CREATE TABLE IF NOT EXISTS ' +
      'users(id number primary key, ' +
      'fullname text, position text, hospital text)';

    var sqlInsert = 'INSERT INTO users(fullname, position, hospital) ' +
    'VALUES(?, ?, ?)';

    $cordovaSQLite.execute($rootScope.db, sql, [])
      .then(function (res) {
        // success
        console.log('Create table success');
        return $cordovaSQLite.execute($rootScope.db, sqlInsert,
          ['สถิตย์ เรียนพิศ', 'นักวิชาการคอมพิวเตอร์', 'รพช.กันทรวิชัย']);
      })
      .then(function (res) {
        console.log('Insert success');
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

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
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
