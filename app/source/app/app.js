

angular.module('lang-tag-manager',['ngRoute', 'templates'])
.config(configFn);

configFn.$inject = ['$routeProvider'];
function configFn($routeProvider){
  $routeProvider
    .when('/',{
      controller : 'mainController',
      templateUrl : 'main/main.html'
    })
}
