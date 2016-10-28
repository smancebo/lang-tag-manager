(function(angular){


var deps = [
	'templates',
	'app.config',
	'app.settings',
	'app.idiomas',
	'app.etiquetas',
	'ngMessages',
	'ngMaterial',
	'ngAnimate',
	'angular-toArrayFilter'
];

angular.module('lang-tag-manager', deps)

	.run(runFn)
	.controller('mainController', mainController)
	.config(configFn);

runFn.$inject = ['$rootScope'];
function runFn($rootScope){
	$rootScope.$on('$routeChangeStart', function($event, next, prev){
		$rootScope.currentTitle = next.$$route.title;
	});
}

configFn.$inject = ['$mdThemingProvider'];
function configFn($mdThemingProvider){

  // var customBlueMap = 	$mdThemingProvider.extendPalette('light-blue', {
  //   'contrastDefaultColor': 'light',
  //   'contrastDarkColors': ['50'],
  //   '50': 'ffffff'
  // });
  // $mdThemingProvider.definePalette('customBlue', customBlueMap);
  // $mdThemingProvider.theme('default')
  //   .primaryPalette('customBlue', {
  //     'default': '500',
  //     'hue-1': '50'
  //   })
  //   .accentPalette('pink');
  $mdThemingProvider.theme('input', 'default')
        .primaryPalette('grey');

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
