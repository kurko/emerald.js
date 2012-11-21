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
