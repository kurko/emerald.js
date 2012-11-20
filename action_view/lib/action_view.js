Emerald.ActionView.extend = function(actions){
  // instance object to be returned
  var instance = new Object;
  var _this = this;
  _this.actions = actions;

  if (_this.actions.initialize) {
    $(document).ready(function(){
      _this.actions.initialize();
    });
  }

  // initializes this View's elements
  $(document).ready(function() {
    Emerald.ActionView.Elements.bindToView();
    Emerald.ActionView.Events.bindElementToViewAction(_this.actions);
  });

  // defines the method of the new view instance
  for (action in actions) {
    instance[action] = actions[action];
  }

  return instance;
}
