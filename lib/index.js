var ParanoiaApi = require('./paranoia');
var Db = require('./db');
var _ = require('underscore');
//var async = require('async');

module.exports = function (hoodie) {
  var paranoia = {};
  var pluginDb = new Db(hoodie, 'plugins/hoodie-plugin-paranoia');
  /**
   * PubSub dbName
   */

  _.extend(paranoia,  new ParanoiaApi(hoodie, pluginDb));


  return paranoia;
};
