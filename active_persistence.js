function emeraldPersistence(model){
  var singleton = function() {
    this.initialize = function(model, _class) {
      this.model = model;
      this._class = _class;
      return this;
    }

    this.save = function(callback){
      return new this._class.PersistenceSave().save(callback);
    }
  }

  this.PersistenceSave = function() {
    var singleton = function() {
      this.initialize = function(model, _class) {
        this.model = model;
        this._class = _class;
        return this;
      }

      this.save = function(controller) {
        var attributes = this.model.attributes();
        var _controller = controller;

        var requestSpecs = {
          url: this.model.route(),
          data: attributes,
          type: this.requestType(attributes),
          dataType: "json"
        };

        $.ajax(requestSpecs).done(function(JSON) {
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

