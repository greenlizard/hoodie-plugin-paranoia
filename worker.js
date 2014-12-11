/**
 * Hoodie plugin paranoia
 * Lightweight and easy paranoia
 */

/**
 * Dependencies
 */
var Paranoia = require('./lib');

/**
 * Paranoia worker
 */

module.exports = function (hoodie, callback) {
  var paranoia = new Paranoia(hoodie);

//YO[HOODIE-PLUGIN]

console.log(process.env)

  hoodie.account.on('change',  paranoia.onChange);

  hoodie.database.findAll(function (err, dbs, res) {
    if (err) return callback(err);
    dbs = dbs.filter(function (v, k) {
      console.log(v);
      return (v.split('/').shift() === 'user')
    });
    console.log(dbs)
    dbs.forEach(paranoia.add2pool);
  })



  callback();
};
