angular.module('starter.services', [])

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

      save: function (db, fullname, position, hospital) {
        var q = $q.defer();

        var sql = 'INSERT INTO users(fullname, position, hospital) ' +
        'VALUES(?, ?, ?)';

        $cordovaSQLite.execute(db, sql, [fullname, position, hospital])
          .then(function (res) {
            q.resolve(res);
          }, function (err) {
            q.reject(err);
          });

        return q.promise;
      }
    }

  });
