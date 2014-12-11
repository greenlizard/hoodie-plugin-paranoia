/**
 * Dependencies
 */

// var utils = require('hoodie-utils-plugins');
// var async = require('async');
// var ExtendedDatabaseAPI = require('hoodie-utils-plugins').ExtendedDatabaseAPI;
var follow = require('follow');

module.exports = function (hoodie, pluginDb) {
  var Paranoia = this;

//YO[HOODIE-PLUGIN-PRIVATE]

  // var _setAttrs = function (task, attr, cb) {
  //   if (!attr || !task[attr]) {
  //     return cb('Pls, fill the param: ' + attr);
  //   }
  //   task.subject = 'post';
  //   cb();
  // };

//YO[HOODIE-PLUGIN]


  var pool = {};
  var _add2pool =  function (dbname, cb) {
    if (!pool[dbname]) {

      pool[dbname] = {};
      pool[dbname].opts = {}; // Same options paramters as before
      pool[dbname].feed = new follow.Feed(pool[dbname].opts);
      pool[dbname].couch_url = hoodie._resolve('') + dbname.replace('/', '%2F');
      // You can also set values directly.
      pool[dbname].feed.db            = pool[dbname].couch_url;
      pool[dbname].feed.since         = 3;
      pool[dbname].feed.heartbeat     = 30    * 1000;
      pool[dbname].feed.inactivity_ms = 86400 * 1000;
      pool[dbname].feed.include_docs  = true;

      // pool[dbname].feed.filter = function (doc, req) {
      //   // req.query is the parameters from the _changes request and also feed.query_params.
      //   console.log('Filtering for query: ' + JSON.stringify(req.query));

      //   if(doc.stinky || doc.ugly)
      //     return false;
      //   return true;
      // }

      pool[dbname].feed.on('change', function (change) {
        cb(null, {doc: change.doc, dbname: dbname});
        // console.log('Doc ' + change.id + ' in change ' + change.seq + ' is neither stinky nor ugly.');
        // console.log('changes', {doc: change.doc, dbname:dbname});
      });

      pool[dbname].feed.on('catchup', function () {
        console.log('arguments catchup', arguments);
      });

      pool[dbname].feed.on('error', function (err) {
        // console.error('Since Follow always retries on errors, this must be serious');
        // console.error('err:', er);
        // console.error(feed.db);
        cb({Error: err, dbname: dbname});
        //throw er;
      });

      pool[dbname].feed.follow();
    }
  };

  Paranoia.add2pool = function (dbname) {
    _add2pool(dbname, function (err, obj) {
        if (err) console.log(err);
        console.log(arguments);
        pluginDb.add('docs', { id: obj.doc.type }, function (err, doc /*, res*/) {
          if (err) console.log(err);
          console.log(doc);
        });
      });
  };

  Paranoia.onChange = function (doc) {
    if (doc.roles && doc.roles.indexOf('confirmed') >= 0) {
      Paranoia.add2pool(doc.database);
    }
  };

  return Paranoia;
};
