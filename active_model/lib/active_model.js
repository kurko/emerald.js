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

  instance.update = function(domElements){
    for (i = 0; i < domElements.length; i++) {
      var element = domElements[i];
      this[element.name] = element.value;
    }

    return this;
  }

  instance.save = function(andCallbackController, persistenceObject) {
    if (!persistenceObject)
      persistenceObject = Emerald.Persistence;

    // TODO verify that `data` fields are the ones listed in this.attrAccessible
    return new persistenceObject(this).save(andCallbackController);
  }

  return instance;
}
