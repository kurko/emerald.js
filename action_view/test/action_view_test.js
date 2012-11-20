module("Emerald.ActionView", {
});

test(".extend initializes a View with the correct actions", function() {
  var view = Emerald.ActionView.extend({
    changeFullName: function(){ return 'changed'; },
    name: 'Alex'
  });

  equal( view.changeFullName(), 'changed' );
  equal( view.name, 'Alex' );
});

test(".extend generate actions that are called whenever an element changes", function() {
  var html = '<div data-view="cartView"><input data-view-action="update_item"></div>';
  fixture.html(html);

  var mock = 1;
  Emerald.cartView = Emerald.ActionView.extend({
    update_item: function(){ mock = 2; },
    name: 'Alex'
  });

  fixture.find('[data-view-action]').trigger('keyup');
  equal( mock, 2 );
});
