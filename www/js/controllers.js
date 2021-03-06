angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope, $log, $ionicPlatform,
    $rootScope, UserService, $ionicLoading) {

    $scope.users = [];

    $scope.$on("$ionicView.enter", function (event, data) {
      $scope.getUsers();
    });

    $scope.getUsers = function () {

      $ionicLoading.show({
        template: '<ion-spinner icon="android"></ion-spinner>'
      });

      $scope.users = [];

      $ionicPlatform.ready(function () {

        UserService.getUsers($rootScope.db)
          .then(function (res) {
            for (var i = 0; i <= res.rows.length - 1; i++) {

              //$log.info(JSON.stringify(res.rows.item(i)));

              var obj = {};

              obj.id = res.rows.item(i).id;
              obj.fullname = res.rows.item(i).fullname;
              obj.position = res.rows.item(i).position;
              obj.hospital = res.rows.item(i).hospital;
              obj.image = res.rows.item(i).image;

              $scope.users.push(obj);

            }
            $scope.$broadcast('scroll.refreshComplete');
            $ionicLoading.hide();

          }, function (err) {
            $ionicLoading.hide();
            $scope.$broadcast('scroll.refreshComplete');
            alert(JSON.stringify(err));
          });
      });
    };

    $scope.doRefresh = function () {
      $scope.getUsers();
    };

  })
  .controller('NewCtrl', function ($scope, $log, $state,
    $rootScope, $ionicPlatform, $cordovaCamera, UserService) {

    $scope.user = {};
    $scope.image = {};

    $scope.takePicture = function () {

      $ionicPlatform.ready(function () {

        var options = {
          quality: 100,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.PNG,
          targetWidth: 400,
          targetHeight: 400,
          saveToPhotoAlbum: false,
          correctOrientation: true
        };

        $cordovaCamera.getPicture(options)
          .then(function (imageData) {
            $log.info(imageData);
            $scope.image.src = "data:image/jpeg;base64," + imageData;
            $scope.image_src = imageData;

          }, function (err) {
            $log.error(err);
          });
      });
    };

    $scope.save = function () {
      UserService.save($rootScope.db,
        $scope.user.fullname, $scope.user.position,
        $scope.user.hospital, $scope.image.src)
        .then(function () {
          $state.go('tab.dash');
        }, function (err) {
          alert(JSON.stringify(err));
        });
    };

  })
  .controller('DetailCtrl', function ($scope, $state, $log, $ionicPlatform, $ionicPopup, $cordovaCamera, $rootScope, $stateParams, UserService) {

    $scope.id = $stateParams.id;
    $scope.image = {};

    UserService.detail($rootScope.db, $scope.id)
      .then(function (user) {
        //alert(JSON.stringify(user));
        $scope.user = user;
      }, function (err) {
        alert(JSON.stringify(err));
      });


    $scope.takePicture = function () {
      $ionicPlatform.ready(function () {
        var options = {
          quality: 100,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.PNG,
          targetWidth: 400,
          targetHeight: 400,
          saveToPhotoAlbum: false,
          correctOrientation: true
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {
          $log.info(imageData);
          $scope.user.image = "data:image/jpeg;base64," + imageData;
        }, function (err) {
          $log.error(err);
        });
      });
    };

    $scope.save = function () {
      UserService.update($rootScope.db, $scope.id, $scope.user.fullname,
        $scope.user.position, $scope.user.hospital, $scope.user.image)
        .then(function () {
          $state.go('tab.dash');
        }, function (err) {
          alert(JSON.stringify(err));
        });
    };

    $scope.remove = function () {
      $ionicPopup.confirm({
        title: 'Are you sure?',
        template: 'คุณต้องการลบ ใช่หรือไม่?'
      })
        .then(function (res) {
          if (res) {
            UserService.remove($rootScope.db, $scope.id)
              .then(function () {
                $state.go('tab.dash');
              }, function (err) {
                alert(JSON.stringify(err));
              });
          } else {
            //console.log('You are not sure');
          }
        });


    };


  })
  .controller('MapCtrl', function () {

  })
  .controller('PushCtrl', function ($scope, $ionicLoading, $rootScope, $ionicPopup, $http, PushService) {
    $scope.users = [];

    $scope.getUsers = function () {

      $ionicLoading.show({
        template: '<ion-spinner icon="android"></ion-spinner>'
      });

      PushService.getUsers()
        .then(function (data) {
          // alert(JSON.stringify(data.rows));
          $scope.users = data.rows;
          $scope.$broadcast('scroll.refreshComplete');
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          console.log(err);
          $scope.$broadcast('scroll.refreshComplete');

        });
    };

    // $scope.getUsers();

    $scope.$on("$ionicView.enter", function (event, data) {
      $scope.getUsers();
    });

    $scope.doRefresh = function () {
      $scope.getUsers();
    };

    $scope.sendMessage = function () {

      $scope.data = {};

      $ionicPopup.show({
        template: '<input type="text" ng-model="data.message">',
        title: 'Enter Message',
        subTitle: 'Enter you message to send',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Send</b>',
            type: 'button-positive',
            onTap: function (e) {
              if (!$scope.data.message) {
                //don't allow the user to close unless he enters wifi password
                e.preventDefault();
              } else {
                return $scope.data.message;
              }
            }
          },
        ]
      })
        .then(function (message) {
          //console.log('Tapped!', res);
          var message = message;
          var username = $rootScope.username;

          $http.post('http://192.168.43.76:3000/send', {
            username: username,
            message: message
          })
            .success(function (data) {
              if (data.ok) {
                ///
              } else {
                $ionicPopup.alert({
                  title: 'Error',
                  template: 'Message don\'t sent'
                });
              }
            })
            .error(function () {
              console.log('Connection failed');
            });

        });
     };


  });