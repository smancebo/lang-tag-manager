(function(angular){

  angular.module('app.etiquetas',['ngRoute'])
  .config(configFn);

  configFn.$inject = ['$routeProvider'];
  function configFn($routeProvider){
    $routeProvider
    .when('/etiquetas',{
      controller:'etiquetasController',
      controllerAs:'ctrl',
      templateUrl:'etiquetas/choose_idioma.html'
    })
    .when('/etiquetas/:lang',{
      controller:'etiquetasController',
      controllerAs:'ctrl',
      templateUrl:'etiquetas/etiquetas.html'
    });
  }

})(window.angular);
