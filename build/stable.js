var Emerald = {
  Core: {},
  ActionView: {
    Elements: {},
    Events:   {}
  }
};


Emerald.ActionView.extend = function(actions){
  // instance object to be returned
  var instance = new Object;
  var _this = this;
  _this.actions = actions;

  if (_this.actions.initialize) {
    $(document).ready(function(){
      _this.actions.initialize();
    });
  }

  // initializes this View's elements
  $(document).ready(function() {
    Emerald.ActionView.Elements.bindToView();
    Emerald.ActionView.Events.bindElementToViewAction(_this.actions);
  });

  // defines the method of the new view instance
  for (action in actions) {
    instance[action] = actions[action];
  }

  return instance;
}

Emerald.ActionView.Elements.bindToView = function() {
  $("[data-view-action]").each(function(index, viewElement){
    var elementsView = $(this).closest("[data-view]").data("view");
    viewElement.setAttribute('extendsView', elementsView);
  });
}

Emerald.ActionView.Elements.dataFieldsSelector = function(){
  var selector = "";
  selector+= "input[type='text'], ";
  selector+= "input[type='radio']:checked";
  return selector;
}

Emerald.ActionView.Elements.dataFields = function(){
  var selectors = this.dataFieldsSelector();
  return $(selectors);
}

Emerald.ActionView.Events.bindElementToViewAction = function(viewActions) {
  $('[data-view-action]').each(function(index, viewElement){
    var _event = viewElement.getAttribute('data-event');
    var _viewAction = viewElement.getAttribute('data-view-action');

    _event = Emerald.ActionView.Events.defineDefaultEvent(viewElement, _event);

    var dataFieldSelector = "";
    dataFieldSelector+= "input[type='text'][data-view-action='"+_viewAction+"'], ";
    dataFieldSelector+= "input[type='radio'][data-view-action='"+_viewAction+"']:checked";

    $(this).on(_event, function(e){
      var dataFields = $(dataFieldSelector);
      viewActions[_viewAction](e, dataFields);
    });
  });
}

Emerald.ActionView.Events.defineDefaultEvent = function(domElement, _event) {
  if (_event)
    return _event;
  else
    return 'keyup';
}

function emeraldActionController(){
  this.extend = function(properties){
    var _this = this;
    _this.properties = properties;

    return new emeraldActionControllerInstance(properties);
  }
}

function emeraldActionControllerInstance(properties){
  var singleton = function() {
    this.self = function(properties){
      this.properties = properties;

      for (propertyName in properties) {
        if (!this[propertyName])
          this[propertyName] = properties[propertyName];
      }

      return this;
    }

    this.params = function(domElements){
      var params = new Object;

      for (i = 0; i < domElements.length; i++) {
        var element = domElements[i];
        params[element.name] = element.value;
      }

      return params;
    }

    this.persistView = true;

    this.persistViewCallback = function(JSON) {
      debugger;
      if (this.persistView)
        Emerald.modelObserver.update(JSON);
      return true;
    }
  }

  var instance = new singleton().self(properties);
  return instance;
}

function emeraldActiveModel(){
  this.extend = function(properties){
    var _this = this;
    _this.properties = properties;

    return new emeraldActiveModelInstance(properties);
  }
}

function emeraldActiveModelInstance(properties){
  var singleton = function() {
    this.self = function(properties){
      this.properties = properties;
      return this;
    }

    this.attributes = function() {
      attributesValues = {};
      if (this.properties.attrAccessible) {
        var attributes = this.properties.attrAccessible;
        for (attribute in attributes) {
          var attributeName = attributes[attribute];
          if (this[attributeName])
            attributesValues[attributeName] = this[attributeName];
        }
      }
      return attributesValues;
    }

    this.route = function() { return this.properties.route; }

    this.get = function(attribute) {
      if (this.properties[attribute])
        return this.properties[attribute];
      else
        return "none";
    }

    this.save = function(data, andCallbackController) {
      // TODO verify that `data` fields are the ones listed in this.attrAccessible
      debugger;
      var persistence = new emeraldPersistence(this).save(data, andCallbackController);
      return persistence;
    }
  }

  function createAccessibleAttributes(singleton, attributes) {
    for (attribute in attributes) {
      singleton.prototype[attributes[attribute]] = null;
    }
  }

  var instance = new singleton().self(properties);
  createAccessibleAttributes(singleton, properties.attrAccessible);
  return instance;
}

// Observes the whole document for [data-observe] elements. Whenever an Ajax
// call is made, the JSON response should be passed in to
//
//   observer.update(response)
//
// It will update all the elements in the document with the JSON data.
//
// Example:
//
//   JSON: {"item":{"name":"My item", "price":"US$40,00"}}
//
//   Document:
//
//     <span data-observe="item.name"></span>
//     <span data-observe="item.price"></span>
//
// The first HTML element will be updated with "My item" automatically and
// the second, price, with "US$40,00".
//
function modelObserver(){}

Emerald.modelObserver = new modelObserver();

modelObserver.prototype.update = function(jsonData){
  $("[data-observe]").each(function(index){
    var observing = $(this).data("observe");
    var observedResources = observing.split(".");

    var currentValue = jsonData;
    $.each(observedResources, function(index, value){
      if (currentValue[value] || typeof currentValue[value] == "string")
        currentValue = currentValue[value];
      else
        return false;
    });

    switch (typeof currentValue) {
      case "number":
      case "bool":
      case "string":
        $(this).html(currentValue);
        return true;
    }

  });
};

function emeraldPersistence(model){
  var singleton = function() {
    this.initialize = function(model, _class) {
      this.model = model;
      this._class = _class;
      return this;
    }

    this.save = function(data, callbackController){
      return new this._class.PersistenceSave().save(data, callbackController);
    }
  }

  this.PersistenceSave = function() {
    var singleton = function() {
      this.initialize = function(model, _class) {
        this.model = model;
        this._class = _class;
        return this;
      }

      this.save = function(data, controller) {
        //var attributes = this.model.attributes();
        var attributes = data;
        var _controller = controller;

        var requestSpecs = {
          url: this.model.route(),
          data: attributes,
          type: this.requestType(attributes),
          dataType: "json"
        };

        $.ajax(requestSpecs).done(function(JSON) {
          debugger;
          if (_controller)
            _controller.persistViewCallback(JSON);
        }).fail(function(response) {
          // TODO handle errors
          if (_controller)
            _controller.persistViewCallback(JSON);
        });

        return requestSpecs;
      }

      this.requestType = function(attributes) {
        if (attributes["id"])
          return "PUT";
        else
          return "POST";
      }
    }

    var instance = new singleton().initialize(model, this);
    return instance;
  }

  var instance = new singleton().initialize(model, this);
  return instance;
}

