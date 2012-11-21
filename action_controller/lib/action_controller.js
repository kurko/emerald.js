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
