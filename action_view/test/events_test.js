module("Emerald.ActionView.Events", {
});

test(".bindElementToViewAction binds an Element to View action", function(){
  var letter = '';
  var actions = { writeLetter: function() { letter = 'a'; } };
  var element = '<input data-view-action="writeLetter" data-event="keyup">';
  fixture.html(element);

  Emerald.ActionView.Events.bindElementToViewAction(actions);
  $('input', fixture).trigger('keyup');
  equal( letter, 'a');
});

test(".defineDefaultEvent returns keyup if none was given", function(){
  var event = Emerald.ActionView.Events.defineDefaultEvent(null, null);
  ok( event == 'keyup' );
});

test(".defineDefaultEvent returns the given", function(){
  var event = Emerald.ActionView.Events.defineDefaultEvent(null, 'change');
  ok( event == 'change' );
});
