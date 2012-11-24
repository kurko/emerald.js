Emerald.Model.Attributes = {}
Emerald.Model.Attributes.initAttrAccessible = function(model, attrAccessible) {
  model.attributes = function() { return false; }
  if (!attrAccessible)
    return false;

  var attributes = attrAccessible;
  for (attribute in attributes) {
    var attributeName = attributes[attribute];

    // model method
    if (!model[attributeName])
      model[attributeName] = "";

    // attributes hash
    model.attributes = function(attributeName) {
      var attributes = Emerald.Model.Attributes.getAttributes(model);

      if (attributeName)
        return attributes[attributeName];
      else
        return attributes;
    }
  }

  return true;
}

Emerald.Model.Attributes.getAttributes = function(model) {
  var attributesValues = {}
  if (!model.attrAccessible)
    return attributesValues;

  var attributes = model.attrAccessible;
  for (attribute in attributes) {
    var attributeName = attributes[attribute];

    // model method
    attributesValues[attributeName] = model[attributeName];
  }
  return attributesValues;
}
