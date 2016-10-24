angular.module('lang-tag-manager', ['ngRoute', 'templates', 'ngMaterial', 'ngAnimate'])
	.config(configFn)
	.controller('mainController', mainController);

configFn.$inject = ['$routeProvider'];

function configFn($routeProvider) {
	$routeProvider
		.when('/', {
			controller: 'mainController',
			templateUrl: 'main/main.html'
		})
    .when('/idiomas',{
      controller:'idiomaController',
      controllerAs: 'ctrl',
      templateUrl:'idiomas/idiomas.html'
    })
    ;
}

mainController.$inject = ['$scope', '$mdSidenav','$location'];

function mainController($scope, $mdSidenav, $location) {

	$scope.toggleMenu = function() {
		$mdSidenav('menuLeft').toggle();
	};

  $scope.open = function(url){
    alert(url);
    $location.path(url);
  };
	$scope.menu = {
		main: [{
			icon: 'language',
			menuText: 'Idiomas',
      url:'/idiomas'
		}, {
			icon: 'code',
			menuText: 'Etiquetas',
      url:'/etiquetas'
		}],
		settings: [{
			icon: 'settings',
			menuText: 'Configuración',
      url:'/configuracion'
		}]

	};
}
