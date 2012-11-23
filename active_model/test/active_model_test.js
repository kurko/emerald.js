module("Emerald.Model");

test(".extend returns an instance with its properties as functions", function(){
  var myModel = Emerald.Model.extend({
    myMethod: function(){ return "some_value"; }
  });

  equal( myModel.myMethod(), "some_value" );
});

test(".extend runs initialize() method on startup", function(){
  var initializationMock = false;
  var myModel = Emerald.Model.extend({
    initialize: function() { initializationMock = true; }
  });

  deepEqual( initializationMock, true );
});

test("#get returns the value of a field", function(){
  var myModel = Emerald.Model.extend({
    initialize: function() { },
    name: 'Luke'
  });

  equal( myModel.get("name"), "Luke" );
  equal( myModel.get("age"),   null );
});

test("#save asks the persistence layer to save", function(){
  var persistenceMock = false;
  var myModel = Emerald.Model.extend({});

  var persistenceSaveMock = function(data, callback) {
    persistenceMock = data+'+'+callback;
  }

  myModel.save('data', 'callback', function() {
    this.save = persistenceSaveMock;
    return this;
  });

  deepEqual( persistenceMock, 'data+callback' );

  test("#save contract with Persistence layer save", function() {
    ok( myModel.save('data', 'callback') );
  });
});
