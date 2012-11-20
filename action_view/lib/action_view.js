function emeraldView(){
  this.extend = function(actions){
    var _this = this;
    _this.actions = actions;

    if (_this.actions.initialize) {

      $(document).ready(function(){
        _this.actions.initialize();
      });
    }

    $(document).ready(function() {
      _this.initialization.bindElementsToView();
      _this.initialization.bindViewElementsEventsToView(_this.actions);
    });

    for (action in actions) {
    }

    return {};
  }

  this.initialization = {
    // can be removed
    bindElementsToView: function() {
      $("[data-view-element]").each(function(index, viewElement){
        var elementsView = $(this).closest("[data-view]").data("view");
        viewElement.setAttribute('extendsView', elementsView);
      });
    },

    // can be removed
    bindViewElementsEventsToView: function(cartViewActions) {
      $('[data-view-element]').each(function(index, viewElement){
        var _event = viewElement.getAttribute('data-event');
        var _viewAction = viewElement.getAttribute('data-view-element');

        _event = Emerald.View.viewElements.defineDefaultEvent(viewElement, _event);

        var dataFieldSelector = "";
        dataFieldSelector+= "input[type='text'][data-view-element='"+_viewAction+"'], ";
        dataFieldSelector+= "input[type='radio'][data-view-element='"+_viewAction+"']:checked";

        $(this).on(_event, function(e){
          var dataFields = $(dataFieldSelector);
          cartViewActions[_viewAction](e, dataFields);
        });
      });
    }
  },

  this.viewElements = new emeraldViewElements()
}

function emeraldViewElements(){
  this.defineDefaultEvent = function(domElement, _event) {
    if (_event)
      return _event;
    else
      return 'keyup';
  }
}


Emerald.ActionView.bindElementsToView = function() {
  $("[data-view-element]").each(function(index, viewElement){
    var elementsView = $(this).closest("[data-view]").data("view");
    viewElement.setAttribute('extendsView', elementsView);
  });
}


Emerald.ActionView.bindViewElementsEventsToView = function(viewActions) {
  $('[data-view-element]').each(function(index, viewElement){
    var _event = viewElement.getAttribute('data-event');
    var _viewAction = viewElement.getAttribute('data-view-element');

    _event = Emerald.ActionView.Events.defineDefaultEvent(viewElement, _event);

    var dataFieldSelector = "";
    dataFieldSelector+= "input[type='text'][data-view-element='"+_viewAction+"'], ";
    dataFieldSelector+= "input[type='radio'][data-view-element='"+_viewAction+"']:checked";

    $(this).on(_event, function(e){
      var dataFields = $(dataFieldSelector);
      viewActions[_viewAction](e, dataFields);
    });
  });
}

Emerald.ActionView.Events.defineDefaultEvent = function(domElement, _event) {
  if (_event)
    return _event;
  else
    return 'keyup';
}
