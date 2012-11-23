module("Emerald.Model.Attribute");

test(".attrAccessible defines the data fields", function(){
  var myModel = Emerald.Model.extend({
    attrAccessible: ["name", "age"],
    myMethod: function(){ return "some_value"; }
  });

  equal( myModel.name, "" );
  equal( myModel.age,  "" );
});
