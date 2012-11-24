module('Emerald.Persistence');

test('instance responds to .save, which calls Emerald.Persistence.save()', function() {
  var model = true;
  var persistenceStub = {
    save: function() { return 'saveStub'; }
  }

  var persistence = new Emerald.Persistence(model, persistenceStub);

  equal( persistence.save(), 'saveStub' );
});
