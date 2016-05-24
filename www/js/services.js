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
      },

      update: function (db, id, fullname, position, hospital) {
        var q = $q.defer();

        var sql = 'UPDATE users SET fullname=?, position=?, hospital=? ' +
        'WHERE id=?';

        $cordovaSQLite.execute(db, sql, [fullname, position, hospital, id])
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
