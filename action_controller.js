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

    this.persistView = true;

    this.persistViewCallback = function(JSON) {
      if (this.persistView)
        Emerald.modelObserver.update(JSON);
      return true;
    }
  }

  var instance = new singleton().self(properties);
  return instance;
}
