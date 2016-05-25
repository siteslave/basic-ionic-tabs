angular.module('starter.services', [])

  .factory('PushService', function ($q, $http) {
    return {
      getUsers: function () {
        var q = $q.defer();
        $http.get('http://192.168.43.76:3000/users/list')
          .success(function (data) {
            q.resolve(data);
          })
          .error(function () {
            q.reject('Connection failed');
          });


        return q.promise;
      }
    }
  })
  .factory('UserService', function ($q, $cordovaSQLite) {

    return {
      getUsers: function (db) {
        var q = $q.defer();

        var sql = 'SELECT * FROM users';

        $cordovaSQLite.execute(db, sql, [])
          .then(function (res) {
            q.resolve(res);
          }, function (err) {
            q.reject(err);
          });

        return q.promise;
      },

      save: function (db, fullname, position, hospital, image) {
        var q = $q.defer();

        var sql = 'INSERT INTO users(fullname, position, hospital, image) ' +
        'VALUES(?, ?, ?, ?)';

        $cordovaSQLite.execute(db, sql, [fullname, position, hospital, image])
          .then(function (res) {
            q.resolve(res);
          }, function (err) {
            q.reject(err);
          });

        return q.promise;
      },

      update: function (db, id, fullname, position, hospital, image) {
        var q = $q.defer();

        var sql = 'UPDATE users SET fullname=?, position=?, hospital=?, image=?' +
        'WHERE id=?';

        $cordovaSQLite.execute(db, sql, [fullname, position, hospital, image, id])
          .then(function (res) {
            q.resolve(res);
          }, function (err) {
            q.reject(err);
          });

        return q.promise;
      },

      detail: function (db, id) {
        var q = $q.defer();

        var sql = 'SELECT * FROM users WHERE id=?';

        $cordovaSQLite.execute(db, sql, [id])
          .then(function (res) {
            q.resolve(res.rows.item(0));
          }, function (err) {
            q.reject(err);
          });

        return q.promise;
      },

      remove: function (db, id) {
        var q = $q.defer();

        var sql = 'DELETE FROM users WHERE id=?';

        $cordovaSQLite.execute(db, sql, [id])
          .then(function (res) {
            q.resolve();
          }, function (err) {
            q.reject(err);
          });

        return q.promise;
      }
    }

  });
