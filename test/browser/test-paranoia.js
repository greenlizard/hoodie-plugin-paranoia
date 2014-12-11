suite('network', function () {
  this.timeout(15000);

  suiteSetup(loadUsers);

  test('signIn hommer', function (done) {
    hoodie.account.signIn('Hommer', '123')
      .fail(function (err) {
        done();
        assert.ok(false, err.message);
      })
      .done(function () {
        assert.equal(
          hoodie.account.username,
          'hommer',
          'should be logged in after signup'
        );
        done();
      });
  });

  test('hommer store something', function (done) {
    hoodie.store.add('bart', { test: 'doh!'})
      .fail(function (err) {
        done(err);
        assert.ok(false, err.message);
      })
      .then(function () {
        done();
        assert.ok(true, arguments);
      });
  });

});

