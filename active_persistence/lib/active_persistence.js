Emerald.Persistence = function(model, persistenceObject) {
  var instance = new Object;

  if (!persistenceObject)
    persistenceObject = Emerald.Persistence;

  instance.save = function(model, callbackController){
    return persistenceObject.save(model, callbackController);
  }

  return instance;
}

