module("Emerald.js ActionView", {
});

var fixture = $("#qunit-fixture");

test("sets data-view attributes in each data-view-element", function(){
  var element = '<div data-view-element="vader"></div>';
  var view    = '<div data-view="empire">'+element+'</div>';
  fixture.html(view);
  Emerald.ActionView.bindElementsToView();
  equal( $("[data-view-element=vader]").attr('extendsView'), 'empire');
});

test("binds data-view-elements events to a View action", function(){
  var letter = '';
  var actions = { writeLetter: function() { letter = 'a'; } };
  var element = '<input data-view-element="writeLetter" data-event="keyup">';
  fixture.html(element);

  Emerald.ActionView.bindViewElementsEventsToView(actions);
  $('input', fixture).trigger('keyup');
  equal( letter, 'a');
});
