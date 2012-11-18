Emerald.cartView = Emerald.View.extend({
  initialize: function(){
    var value = $('[data-view-element=zipcodeCalculation]').val();
    Emerald.cartController.zipcodeCalculation(value);
  },

  zipcodeCalculation: function(e){
    var value = e.target.value;
    Emerald.cartController.zipcodeCalculation(value);
  },
  
  minimumChars: function(){
    return 3;
  }
});

zipcodeModel = activeModel.extend({
  route: Emerald.Router.zipcodeModel,
  attr_accessible: ['id', 'zipcode', 'company'],
  settings: "hello"
});

Emerald.cartController = Emerald.Controller.extend({
  zipcodeCalculation: function(value){
    zipcodeModel.zipcode = value;
    this.persistView = true;
    zipcodeModel.save(this);
  }
});
