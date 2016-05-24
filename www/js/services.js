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
      }
    }

  });
