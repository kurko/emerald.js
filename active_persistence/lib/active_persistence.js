Emerald.Persistence = function(model) {
  var instance = new Object;

  instance.save = function(data, callbackController){
    return Emerald.Persistence.save(data, callbackController);
  }

  return instance;
}

