(function() {

	angular.module('lang-tag-manager')
		.controller('idiomaController', idiomaController);

	idiomaController.$inject = ['$scope'];

	function idiomaController($scope) {
		var self = this;

    self.idiomas = [
      {id: 'es', descripcion: 'Español'},
      {id: 'en', descripcion: 'English'}
    ];

	}
})();
