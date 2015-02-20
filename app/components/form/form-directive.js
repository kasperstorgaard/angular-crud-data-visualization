//dependencies
require('./form-controller');

//template
require('./form.tpl.html');

module.exports = function formDirective () {
  return {
    restrict: 'A',
    controller: 'formController',
    templateUrl: "form.tpl.html",
    replace: true
  };
};
