(function(angular){

  angular.module('app.etiquetas')
  .controller('etiquetasController', etiquetasController);

  etiquetasController.$inject = ['$scope',
                                 '$location',
                                 'idiomasService',
                                 '$routeParams',
                                 'etiquetasService'

                                 ];
  function etiquetasController($scope,
                               $location,
                               idiomasService,
                               $routeParams,
                               etiquetasService
                               ){
    var self = this;
    self.open = openEtiquetas;

    if (!$routeParams.lang) {
    	idiomasService.getInstaledLanguages().then(function(idiomas) {
    		self.idiomas = idiomas;
    	});

    } else {
      getLangTags($routeParams.lang);
    }

    function openEtiquetas(lang){
      console.log(lang);
      $location.path('/etiquetas/' + lang.id);
    }

    function getLangTags(langId){
      etiquetasService.getLangTags(langId).then(function(tags){
        self.tags = tags;
      });
    }
  }

})(window.angular);
