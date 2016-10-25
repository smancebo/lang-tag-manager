
(function(angular){
  angular.module('app.settings',['ngRoute'])
  .config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/settings', {
      controller:'settingsController',
      controllerAs: 'ctrl',
      templateUrl:'settings/settings.html',
      title:'Configuración'
    });
  }]);
})(window.angular);
