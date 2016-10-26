
(function(angular){

  angular.module('app.idiomas',['ngRoute'])
  .config(configFn);

configFn.$inject = ['$routeProvider'];
function configFn($routeProvider){

  $routeProvider
  .when('/idiomas',{
    controller:'idiomaController',
    controllerAs: 'ctrl',
    templateUrl:'idiomas/idiomas.html',
    title:'Idiomas'
  });
}


})(window.angular);
