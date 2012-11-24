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

  // Persistence callbacks
  instance.afterAjaxResponseSuccessCallback = function(JSON, observerObject) {
    if (!observerObject)
      observerObject = Emerald.Model.Observer;

    if (this.persistView)
      observerObject.update(JSON);

    return true;
  }

  instance.failedAjaxResponseCallback = function(json) {
    // TODO implement
  }

  return instance;
}
