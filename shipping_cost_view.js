Emerald.shippingCostView = Emerald.View.extend({
  initialize: function(){
    // var value = $('[data-view-element=zipcodeCalculation]').val();
    // Emerald.shippingCostController.zipcodeCalculation(value);
  },

  zipcodeCalculation: function(e, fields){
    var value = e.target.value;
    if (this.isValidZipcode(value) )
      Emerald.shippingCostController.zipcodeCalculation(fields);
  },

  shippingData: function(){
    var data = {
      zipcode: this.zipcode,
      type: this.type
    }
  },

  isValidZipcode: function(value){
    return value.replace(/[^0-9]/g, '').length == 8;
  }
});

zipcodeModel = activeModel.extend({
  route: Emerald.Router.zipcodeModel,
  attrAccessible: ['id', 'zipcode', 'type']
});

Emerald.shippingCostController = Emerald.Controller.extend({
  zipcodeCalculation: function(params){
    params = this.params(params);
    this.persistView = true;
    zipcodeModel.save(params, this);
  }
});
