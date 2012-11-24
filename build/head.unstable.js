var Emerald = {
  Version: "0.0.1",
  Core: {},
  Controller: {},
  ActionView: {
    Elements: {},
    Events:   {}
  },
  Model: {}
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

Emerald.Controller.extend = function(actions){
  var instance = new Object;
  var _this = this;
  _this.actions = actions;

  // defines the method of the new controller instance
  for (action in actions) {
    instance[action] = actions[action];
  }

  instance.params = function(domElements){
    var params = new Object;

    for (i = 0; i < domElements.length; i++) {
      var element = domElements[i];
      params[element.name] = element.value;
    }

    return params;
  }

  instance.persistView = true;

  instance.persistViewCallback = function(JSON, observerObject) {
    if (!observerObject)
      observerObject = Emerald.Model.Observer;

    if (this.persistView)
      observerObject.update(JSON);

    return true;
  }

  return instance;
}

Emerald.Model.extend = function(properties) {
  var instance = new Object;
  var _this = this;
  this.properties = properties;

  // defines the method of the new view instance
  for (property in properties) {
    instance[property] = properties[property];
  }

  // runs initialization on startup
  if (this.properties.initialize) {
    $(document).ready(function(){ _this.properties.initialize(); });
  }

  // defines attrAccessible fields
  Emerald.Model.Attributes.initAttrAccessible(instance, properties.attrAccessible);

  instance.get = function(attribute) {
    if (_this.properties[attribute])
      return _this.properties[attribute];
    else
      return null;
  }

  instance.save = function(data, andCallbackController, persistenceObject) {
    if (!persistenceObject)
      persistenceObject = Emerald.Persistence;

    // TODO verify that `data` fields are the ones listed in this.attrAccessible
    return new persistenceObject(this).save(data, andCallbackController);
  }

  return instance;
}

Emerald.Model.Attributes = {}
Emerald.Model.Attributes.initAttrAccessible = function(model, attrAccessible) {
  model.attributes = function() { return false; }
  if (!attrAccessible)
    return false;

  var attributes = attrAccessible;
  for (attribute in attributes) {
    var attributeName = attributes[attribute];

    // model method
    if (!model[attributeName])
      model[attributeName] = "";

    // attributes hash
    model.attributes = function(attributeName) {
      var attributes = Emerald.Model.Attributes.getAttributes(model);

      if (attributeName)
        return attributes[attributeName];
      else
        return attributes;
    }
  }

  return true;
}

Emerald.Model.Attributes.getAttributes = function(model) {
  var attributesValues = {}
  if (!model.attrAccessible)
    return attributesValues;

  var attributes = model.attrAccessible;
  for (attribute in attributes) {
    var attributeName = attributes[attribute];

    // model method
    attributesValues[attributeName] = model[attributeName];
  }
  return attributesValues;
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
Emerald.Model.Observer = {
  update: function(jsonData){
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

    return true;
  }
}

Emerald.Persistence = function(model, persistenceObject) {
  var instance = new Object;

  if (!persistenceObject)
    persistenceObject = Emerald.Persistence;

  instance.save = function(model, callbackController){
    return persistenceObject.save(model, callbackController);
  }

  return instance;
}


Emerald.Persistence.save = function(model, callbackController) {
  var instance = function() {
    this.initialize = function(model) {
      this.model = model;
      return this;
    }

    this.save = function(model, controller) {
      var attributes = this.model.attributes();

      if (!attributes)
        return false;

      var _controller = controller;
      var requestSpecs = Emerald.Persistence.saveRequest(model);

      $.ajax(requestSpecs).done(function(jsonResponse) {
        if (_controller)
          _controller.persistViewCallback(jsonResponse);
      }).fail(function(jsonResponse) {
        if (_controller)
          _controller.failedAjaxResponseCallback(jsonResponse);
      });

      return requestSpecs;
    }

    return this;
  }

  instance().initialize(model);
  return instance().save(model, callbackController);
}

Emerald.Persistence.saveRequest = function(model) {
  var attributes = model.attributes();

  return {
    url: model.route,
    data: attributes,
    type: Emerald.Persistence.saveRequestType(attributes),
    dataType: "json"
  }
}

Emerald.Persistence.saveRequestType = function(attributes) {
  if (attributes["id"])
    return "PUT";
  else
    return "POST";
}
