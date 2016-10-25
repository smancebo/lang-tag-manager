(function(angular) {

	angular.module('app.idiomas')
		.controller('idiomaController', idiomaController);

	idiomaController.$inject = ['$scope', '$mdDialog','$timeout'];

	function idiomaController($scope, $mdDialog,$timeout) {
		var self = this;
		self.openAddIdioma = openAddIdioma;



		$scope.idiomas = [{
			id: 'es',
			descripcion: 'Español'
		}, {
			id: 'en',
			descripcion: 'English'
		}];

		function openAddIdioma(ev) {
			self.idioma = {};
			$mdDialog.show({
				title: 'Agregar Idioma',
				controller: dialogController,
				controllerAs: 'ctrl',
				templateUrl: 'idiomas/add-idioma.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true
			});
		}

		function dialogController(){

			var self = this;
			self.addIdioma = addIdioma;
			self.closeAddDialog = closeAddDialog;

			function addIdioma(ctrl) {
				$timeout(function() {
					$scope.idiomas.push(self.idioma);
					closeAddDialog();
				});
			}

			function closeAddDialog() {
				$mdDialog.cancel();
			}
		}
	}
})(angular);
