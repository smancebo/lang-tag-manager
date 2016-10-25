(function(angular){


var deps = [
	'templates',
	'app.settings',
	'app.idiomas',
	
	'ngMaterial',
	'ngAnimate'
];

angular.module('lang-tag-manager', deps)

	.run(runFn)
	.controller('mainController', mainController);

runFn.$inject = ['$rootScope'];
function runFn($rootScope){
	$rootScope.$on('$routeChangeStart', function($event, next, prev){
		$rootScope.currentTitle = next.$$route.title;
	});
}



mainController.$inject = ['$scope', '$mdSidenav','$location'];

function mainController($scope, $mdSidenav, $location) {

	$scope.toggleMenu = function() {
		$mdSidenav('menuLeft').toggle();
	};

	function closeMenu(){
		$mdSidenav('menuLeft').close();
	}

  $scope.open = function(url){

    $location.path(url);
		closeMenu();
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
      url:'/settings'
		}]

	};
}
})(window.angular);
