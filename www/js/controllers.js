angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope, $log, $ionicPlatform,
    $rootScope, UserService, $ionicLoading) {

    $scope.$on("$ionicView.beforeEnter", function (event, data) {
      $scope.getUsers();
    });

    $scope.users = [];

    $scope.getUsers = function () {

      $ionicLoading.show({
          template: '<ion-spinner icon="android"></ion-spinner>'
      });

      $scope.users = [];

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

            $ionicLoading.hide();

          }, function (err) {
            $ionicLoading.hide();
            alert(JSON.stringify(err));
          });
      });
    };

    $scope.getUsers();

  })
  .controller('NewCtrl', function ($scope, $state, $rootScope, UserService) {

    $scope.user = {};

    $scope.save = function () {
      UserService.save($rootScope.db, $scope.user.fullname, $scope.user.position, $scope.user.hospital)
        .then(function () {
          $state.go('tab.dash');
        }, function (err) {
          alert(JSON.stringify(err));
        });
    };

  });
