## Draft features

```html
<div class="options" data-view="cartView">
  Shipping type:
  <input type="radio" name="type" value="slow" checked="checked" data-view-element="zipcodeCalculation" /> Slow

  <input type="radio" name="type" value="fast" data-view-element="zipcodeCalculation" /> Fast

  Zipcode:
  <input type="text" value="1234567" name="zipcode" data-event="keyup" data-view-element="zipcodeCalculation" />

  <span data-observe="shipping.cost">No delivery costs defined</div>
</div>
```

Here, all elements are bound to `zipcodeCalculation` action with
`data-view-element` and belongs to the `cartView` view, defined in the `data-view`
attribute.

The Javascript is described below. Whenever the user types something in the
`zipcode` fields, `zipcodeCalculation` action below takes place.

```javascript
// The view, which represents the HTML elements

Emerald.shippingCostView = Emerald.View.extend({
  initialize: function(){ },

  // Triggered by the keyup event
  zipcodeCalculation: function(event, fields){
    var value = event.target.value;
    if (this.isValidZipcode(value) )
      Emerald.shippingCostController.zipcodeCalculation(fields);
  },

  isValidZipcode: function(value){
    return value.replace(/[^0-9]/g, '').length == 8;
  }
});

Emerald.shippingCostController = Emerald.Controller.extend({
  zipcodeCalculation: function(params){
    // Converts the field values in an JSON object
    params = this.params(params);

    // After saving, the controller will automatically populate the HTML
    // fields with the JSON returned
    this.persistView = true;

    // The Persistence object will send a JSON to the controller, which will
    // be dealt by the Rails controller. If params has `id`, it'll use PUT, 
    // otherwise POST
    zipcodeModel.save(params, this);
  }
});

// The model
zipcodeModel = activeModel.extend({
  // This is the controller URL that represents the persistence layer.
  // Everytime `save` is called, this URL will be called
  route: Emerald.Router.zipcodeModel,

  // This defines the fields to be used when generated a JSON object to be sent
  // to the server in order to save the current model
  attrAccessible: ['id', 'zipcode', 'type']
});

Emerald.Router = {
  zipcodeModel: "/store/my_store/cart/shipping_cost"
}
```

### Automatic updating

Consider the field below:

```html
<span data-observe="shipping.cost">No delivery costs defined</div>
```

Whenever we get a response from the server, such as

```json
{ 'shipping': {'type': 'fast', 'cost': 'US 10.00'}}
```

The `modelObserver` will check for HTML elements containing `data-observe`, then
will interpret to which model attribute this element is linked to, in this case
`cost` in the `shipping` resource, and will update the element automatically.
