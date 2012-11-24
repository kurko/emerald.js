# Emerald.js

A Javascript framework for interactive client-side applications:

* convention over configuration, highly opinionated framework
* uses RESTful Rails controllers to save and load data
* uses models to seamlessly save and persist data
* uses plain old HTML (no handlebars)
* updates elements on the page automatically after server responses
* 100% test coverage

Although it's stable, we do not recommend using it in production as important
features are still being built. As of now, if you decide to use it, you will be
able to at least organize your JS code a lot better. A list of the current
features will be created soon.

## Using with Rails

Use the [emerald-rails](https://github.com/kurko/emerald-rails) gem to easily
install the framework.

------------------

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

### Automatically updating UI elements

Whenever we get a response from the server such as

```
{ 'shipping': {'type': 'fast', 'cost': '$10'} }
```

the **Controller** object will automagically update all elements in the page based on the `data-observe` attribute, such as

```html
<div data-observe="shipping.cost">$10</div>
```

In this case, `cost` is an attribute of the `shipping` resource.

## License

This framework is released under the MIT License.
