Emerald.Persistence = function(model, persistenceObject) {
  var instance = new Object;

  if (!persistenceObject)
    persistenceObject = Emerald.Persistence;

  instance.model = model;

  instance.save = function(callbackController){
    return persistenceObject.save(instance.model, callbackController);
  }

  return instance;
}

