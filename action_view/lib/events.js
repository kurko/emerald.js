Emerald.ActionView.Events.bindElementToViewAction = function(viewActions) {
  $('[data-view-action]').each(function(index, viewElement){
    var _event = viewElement.getAttribute('data-event');
    var _viewAction = viewElement.getAttribute('data-view-action');

    _event = Emerald.ActionView.Events.defineDefaultEvent(viewElement, _event);

    var dataFieldSelector = "";
    dataFieldSelector+= "input[type='text'][data-view-action='"+_viewAction+"'], ";
    dataFieldSelector+= "input[type='radio'][data-view-action='"+_viewAction+"']:checked";

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
