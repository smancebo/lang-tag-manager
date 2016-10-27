/*jshint esversion: 6*/
(function(angular) {

	angular.module('app.idiomas')
		.controller('idiomaController', idiomaController);

	idiomaController.$inject = ['$scope', '$mdDialog','$timeout','idiomasService'];

	function idiomaController($scope, $mdDialog,$timeout,idiomasService) {
		var self = this;
		self.openAddIdioma = openAddIdioma;
		self.getInstaledLanguages = getInstaledLanguages;
		self.delete = deleteLanguage;

		self.getInstaledLanguages();


		function getInstaledLanguages(){
			idiomasService.getInstaledLanguages().then(function(lang){
				$scope.idiomas = [].concat(lang);
			});
		}

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

		function deleteLanguage($event, lang){


			var confirm = $mdDialog.confirm()
				.title('Desea Eliminar el idioma seleccionado?')
				.textContent('Este proceso eliminara el idioma seleccionado asi como cualquier etiqueta creada')
				.ok('Eliminar')
				.parent(angular.element(document.body))
				.ariaLabel('confirmation')
				.cancel('Cancelar')
				.targetEvent($event);

				function ifYes(){

					function success(){
						var alert = $mdDialog.alert()
							.title('Proceso Completado')
							.textContent('El idioma ha sido eleminado con exito!')
							.parent(angular.element(document.body))
							.ariaLabel('confirmation')
							.ok('Aceptar')
							.targetEvent($event);

							self.getInstaledLanguages();

							$mdDialog.show(alert);
					}
					function error(err){
						var error = $mdDialog.alert()
							.title('Algo no anda bien')
							.textContent("Hubo un error eliminando el idioma seleccionado, " + err)
							.parent(angular.element(document.body))
							.ariaLabel('confirmation')
							.ok('Aceptar')
							.targetEvent($event);

							$mdDialog.show(error);
					}

					idiomasService.deleteLanguage(lang).then(success,error);

				}

				$mdDialog.show(confirm).then(ifYes);




		}

		function dialogController(){

			var self = this;
			self.addIdioma = addIdioma;
			self.closeAddDialog = closeAddDialog;



			function addIdioma(ctrl) {

				$timeout(function() {
					console.log(self);
					var lang = {id: self.idioma.id.toLowerCase(),
						description: self.idioma.description.toUpperCase()
					};

					idiomasService.saveLanguage(lang).then(success, error);

					function success(result){
						idiomasService.getInstaledLanguages().then(function(lang){
							$scope.idiomas = [].concat(lang);
						});
						closeAddDialog();
					}
					function error(result){
						self.idioma.error = true;
					}


				});
			}

			function closeAddDialog() {
				$mdDialog.cancel();
			}
		}
	}
})(angular);
