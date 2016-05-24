angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope, $log, $ionicPlatform,
    $rootScope, UserService) {

    $scope.users = [];

    $scope.getUsers = function () {
      $ionicPlatform.ready(function () {
        UserService.getUsers($rootScope.db)
          .then(function (res) {
            for (var i = 0; i <= res.rows.length - 1; i++) {
              $log.info(JSON.stringify(res.rows.item(i)));

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

  });
