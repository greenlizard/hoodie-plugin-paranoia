var async = require('async');
var ExtendedDatabaseAPI = require('hoodie-utils-plugins').ExtendedDatabaseAPI;

module.exports = function (hoodie, dbname) {

  /**
   * PubSub _dbname
   */

  var db = new ExtendedDatabaseAPI(hoodie, hoodie.database(dbname));
  /**
   * PubSub dbAdd
   */

  var dbAdd = function (hoodie, callback) {
    hoodie.database.add(dbname, function (err) {
      callback(err);
    });
  };


  async.series([
    async.apply(dbAdd, hoodie),
  ],
  function (err) {
    if (err) {
      console.error(
        'setup db error() error:\n' + (err.stack || err.message || err.toString())
      );
    }
  });

  return db;
};
