module("Emerald.Model.Attribute");

test(".initAttrAccessible defines the data fields", function(){
  var myModel = Emerald.Model.extend({
    attrAccessible: ["name", "age"],
    myMethod: function(){ return "some_value"; },
    age: '25',
  });

  myModel.name = 'Alex';

  equal( myModel.name, 'Alex' );
  equal( myModel.age,  '25' );
});

test(".initAttrAccessible defines the attributes fields with a hash of value", function(){
  var myModel = Emerald.Model.extend({
    attrAccessible: ["name", "age"],
    myMethod: function(){ return "some_value"; },
    age: '25',
  });

  myModel.name = 'Alex';

  equal( myModel.attributes('name'), 'Alex' );
  equal( myModel.attributes('age'),  '25' );
});

test(".initAttrAccessible defines attributes function even if no attrAccessible was given", function(){
  var myModel = Emerald.Model.extend({
  });

  equal( myModel.attributes(), false );
});

test(".getAttributes gathers a hash with the latest model values", function(){
  var myModel = Emerald.Model.extend({
    attrAccessible: ["name", "age"],
    myMethod: function(){ return "some_value"; },
    age: '25',
  });
  myModel.name = 'Alex';

  var attributes = Emerald.Model.Attributes.getAttributes(myModel);

  equal( attributes['name'], 'Alex' );
  equal( attributes['age'],   '25' );
});
