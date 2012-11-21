## Objectives

* To automatize the process of updating UI elements
* To not use template engines, to use only HTML
* To work on the assumption that the persistence mechanism is a RESTful Rails controller

## Draft features

The HTML contains different View. Below, we have a view which has the purpose
of calculating shipping costs.

**HTML**
```html
<div class="options" data-view="shippingCostView">
  Choose the shipping type:
  <input type="radio" name="type" value="slow" data-view-action="zipcodeCalculation" checked="checked" /> Slow
  <input type="radio" name="type" value="fast" data-view-action="zipcodeCalculation" /> Fast

  Type your zipcode:
  <input name="zipcode" data-view-element="zipcodeCalculation" data-event="keyup" />

  <div data-observe="shipping.cost">No delivery costs defined</div>
</div>
```

The important points:

* **View:** all elements are inside a view with `data-view=shippingCostView`
* **ViewAction:** whenever an element changes, an action is called in the View object
* **Observer:** whenever we get a response back from the server, the cost div will be updated

**Javascript**
```javascript
// View
Emerald.shippingCostView = Emerald.View.extend({
  // Triggered by the keyup event
  zipcodeCalculation: function(event, fields){
    var value = event.target.value;
    if (this.isValidZipcode(value) )
      Emerald.shippingCostController.zipcodeCalculation(fields);
  },

  isValidZipcode: function(value){
    return value.length == 8;
  }
});

// Controller
Emerald.shippingCostController = Emerald.Controller.extend({
  zipcodeCalculation: function(params){
    params = this.params(params);
    zipcodeModel.save(params, this);
  }
});

// Model
zipcodeModel = activeModel.extend({
  route: "/store/my_store/cart/shipping_cost",
  attrAccessible: ['id', 'zipcode', 'type']
});
```

### Automatic updating UI elements

Whenever we get a response from the server such as

```
{ 'shipping': {'type': 'fast', 'cost': 'US 10.00'}}
```

the **modelObserver** object will update all elements in the page based on the `data-observe` attribute, such as

```html
<div data-observe="shipping.cost">$10</div>
```

The modelObserver will check for HTML elements containing `data-observe`, then
will interpret to which model attribute this element is linked to, in this case
`cost` in the `shipping` resource, and will update the element automatically.

## License

This framework is released under the MIT License.
