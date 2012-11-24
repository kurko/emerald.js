module("Emerald.ActivePersistence");

asyncTest(".save calls the controller persistence view", function(){
  var model = Emerald.Model.extend({
    attrAccessible: ['name', 'age'],
    route: 'some_url.json'
  });

  var callbackController = new function() {
    this.mockResponse = false;
    
    this.failedAjaxResponseCallback = function(json) {
      this.mockResponse = true;
      start();
      
      deepEqual( this.mockResponse, true );
      return true;
    }
    return this;
  }

  Emerald.Persistence.save(model, callbackController);
});

test(".save calls the controller persistence view", function(){
  var model = Emerald.Model.extend({
    route: 'some_url.json'
  });

  deepEqual( Emerald.Persistence.save(model), false );
});

test(".saveRequest returns object with request properties", function(){
  var model = Emerald.Model.extend({
    attrAccessible: ['name', 'age'],
    route: 'some_url.json'
  });

  model.name = 'Alex';
  model.age = '25';

  var request = Emerald.Persistence.saveRequest(model);
  var expected = {
    url: 'some_url.json',
    data: { 'name': 'Alex', 'age': '25' },
    type: 'POST',
    dataType: 'json'
  }

  equal( request.url,       expected.url );
  equal( request.data.name, expected.data.name );
  equal( request.data.age,  expected.data.age );
  equal( request.type,      expected.type );
  equal( request.dataType,  expected.dataType );
});
