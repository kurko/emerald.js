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
          _controller.afterDataSaveCallback(jsonResponse);
      }).fail(function(jsonResponse) {
        if (_controller)
          _controller.failedDataSaveCallback(jsonResponse);
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
