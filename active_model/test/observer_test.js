module('Emerald.Model.Observer', function() {});

test('.update updates all [data-observe] fields with the passed in JSON data', function() {
  fixture.html('<div class="fixture" data-observe="user.name">Darth</div>');
  var json = {'user': {'name': 'Darth Vader'}};
  Emerald.Model.Observer.update(json);
  equal( $('.fixture', fixture).html(), 'Darth Vader' );
});

test('.update doesn\'t change a field if the json value is null', function() {
  fixture.html('<div class="fixture" data-observe="user.name">Darth</div>');
  var json = {'user': {'name': null}};
  Emerald.Model.Observer.update(json);
  equal( $('.fixture', fixture).html(), 'Darth' );
});
