angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope, $log, $ionicPlatform, $rootScope, UserService) {

    $scope.users = [];

    $scope.getUsers = function () {
      $ionicPlatform.ready(function () {
        UserService.getUsers($rootScope.db)
          .then(function (res) {
            for (var i = 0; i <= res.rows.length - 1; i++) {
              $log.info(res.rows.item(i));
              var obj = {};
              obj.fullname = res.rows.item(i).fullname;
              obj.position = res.rows.item(i).position;
              obj.hospital = res.rows.item(i).hospital;

              $scope.users.push(obj);
            }
          }, function (err) {
            alert(JSON.stringify(err));
          });
      });
    };

    $scope.getUsers();

  })

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
