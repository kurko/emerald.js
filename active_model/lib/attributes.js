Emerald.Model.Attributes = {}
Emerald.Model.Attributes.initAttrAccessible = function(model, attrAccessible) {
  if (!attrAccessible)
    return false;

  var attributes = attrAccessible;
  for (attribute in attributes) {
    var attributeName = attributes[attribute];
    model[attributeName] = "";
  }

  return true;
}
