Emerald.ActionView.Elements.bindToView = function() {
  $("[data-view-action]").each(function(index, viewElement){
    var elementsView = $(this).closest("[data-view]").data("view");
    viewElement.setAttribute('extendsView', elementsView);
  });
}

Emerald.ActionView.Elements.dataFieldsSelector = function(){
  var selector = "";
  selector+= "input[type='text'], ";
  selector+= "input[type='radio']:checked";
  return selector;
}

Emerald.ActionView.Elements.dataFields = function(){
  var selectors = this.dataFieldsSelector();
  return $(selectors);
}
