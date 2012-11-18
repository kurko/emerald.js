var Emerald = {
  View: new emeraldView,
  Controller: new emeraldActionController
}

var activeModel = new emeraldActiveModel();

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

    return this.base;
  }

  this.base = {
    
  }

  this.initialization = {
    bindElementsToView: function() {
      $("[data-view-element]").each(function(index, viewElement){
        var elementsView = $(this).closest("[data-view]").data("view");
        viewElement.setAttribute('extendsView', elementsView);
      });
    },

    bindViewElementsEventsToView: function(cartViewActions) {
      $('[data-view-element]').each(function(index, viewElement){
        var _event = viewElement.getAttribute('data-event');
        var _viewAction = viewElement.getAttribute('data-view-element');

        _event = Emerald.View.viewElements.defineDefaultEvent(viewElement, _event);

        $(this).on(_event, function(e){
          cartViewActions[_viewAction](e);
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
