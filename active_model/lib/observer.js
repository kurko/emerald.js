// Observes the whole document for [data-observe] elements. Whenever an Ajax
// call is made, the JSON response should be passed in to
//
//   observer.update(response)
//
// It will update all the elements in the document with the JSON data.
//
// Example:
//
//   JSON: {"item":{"name":"My item", "price":"US$40,00"}}
//
//   Document:
//
//     <span data-observe="item.name"></span>
//     <span data-observe="item.price"></span>
//
// The first HTML element will be updated with "My item" automatically and
// the second, price, with "US$40,00".
//
Emerald.Model.Observer = {
  update: function(jsonData){
    $("[data-observe]").each(function(index){
      var observing = $(this).data("observe");
      var observedResources = observing.split(".");

      var currentValue = jsonData;
      $.each(observedResources, function(index, value){
        if (currentValue[value] || typeof currentValue[value] == "string")
        currentValue = currentValue[value];
        else
        return false;
      });

      switch (typeof currentValue) {
        case "number":
        case "bool":
        case "string":
          $(this).html(currentValue);
          return true;
      }

    });

    return true;
  }
}
