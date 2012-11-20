module("Emerald.ActionView.Elements", {
});

test(".bindToView sets data-view attributes in each data-view-element", function(){
  var element = '<div data-view-element="vader"></div>';
  var view    = '<div data-view="empire">'+element+'</div>';
  fixture.html(view);
  Emerald.ActionView.Elements.bindToView();
  equal( $("[data-view-element=vader]").attr('extendsView'), 'empire');
});

test(".dataFieldsSelector returns a string for selecting data fields", function(){
  var selector = Emerald.ActionView.Elements.dataFieldsSelector();
  ok( typeof selector == 'string' );
});

test(".dataFields selects all text inputs", function(){
  var element = '';
  element+= '<input type="text" value="42">';
  fixture.html(element);

  var fields = Emerald.ActionView.Elements.dataFields();
  equal( fields.val(), '42');
});

test(".dataFields selects all checked radio inputs", function(){
  var element = '';
  element+= '<input type="text" value="42">';
  element+= '<input type="radio" name="answer" value="43">';
  element+= '<input type="radio" name="answer" value="44" checked="checked">';
  element+= '<input type="radio" name="answer" value="45">';
  element+= '<input type="radio" name="planets" value="9" checked="checked">';
  element+= '<input type="radio" name="planets" value="10">';
  fixture.html(element);

  var fields = Emerald.ActionView.Elements.dataFields();
  equal( fields[0].value, '42');
  equal( fields[1].value, '44');
  equal( fields[2].value, '9');
});
