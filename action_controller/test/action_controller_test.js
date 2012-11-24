module("Emerald.Controller");

test("instance has actions as functions", function(){
  var mock_called = false;
  var controller = Emerald.Controller.extend({
    action: function(){
      mock_called = true;
    }
  });

  controller.action();
  ok( mock_called === true );
});

test("#params returns a Javascript object representing the View data", function(){
  var mock_called = false;
  var controller = Emerald.Controller.extend({
    action: function(){
      mock_called = true;
    }
  });

  var fields = [
    { name: "first_name", value: "value1" },
    { name: "last_name", value: "value2" }
  ]
  var params = controller.params(fields)

  equal( params["first_name"], "value1" );
  equal( params["last_name"],  "value2" );
});

test("#persistViewCallback notifies the model observer", function(){
  var controller = Emerald.Controller.extend({});
  var mockObserverUpdate = '';
  var observerDouble = { update: function() { mockObserverUpdate = 'called'; } };
  var json = { 'name': 'first_name', 'value': 'value1' }
  var params = controller.persistViewCallback(json, observerDouble);

  equal( mockObserverUpdate,  'called' );
  equal( params,  true );

  test("Emerald.modelObserver.update contract", function(){
    ok( Emerald.Model.Observer.update({}) );
  });
});
