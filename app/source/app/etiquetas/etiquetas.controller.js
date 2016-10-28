(function(angular){

  angular.module('app.etiquetas')
  .controller('etiquetasController', etiquetasController);

  etiquetasController.$inject = ['$scope',
                                 '$location',
                                 'idiomasService',
                                 '$routeParams',
                                 'etiquetasService',
                                 '$mdDialog',
                                 '$window'

                                 ];
  function etiquetasController($scope,
                               $location,
                               idiomasService,
                               $routeParams,
                               etiquetasService,
                               $mdDialog,
                               $window
                               ){


    var self = this;
    self.open = openEtiquetas;
    self.add = guardarEtiqueta;
    self.search = searchTag;
    self.form = {};

    if (!$routeParams.lang) {
    	idiomasService.getInstaledLanguages().then(function(idiomas) {
    		self.idiomas = idiomas;
    	});

    } else {
      getLangTags($routeParams.lang);
    }


    function searchTag(){

    }
    function guardarEtiqueta(tag){

      function success(){
        getLangTags(self.langId);
      }
      function error(err){
        var error = $mdDialog.alert()
          .title('Algo no anda bien')
          .textContent("Hubo un error agregando la etiqueta, " + err)
          .parent(angular.element(document.body))
          .ariaLabel('confirmation')
          .ok('Aceptar')
          .targetEvent($event);

          $mdDialog.show(error);
      }

      etiquetasService.saveLangTag(self.langId, tag).then(success,error);
    }

    function openEtiquetas(lang){
      $location.path('/etiquetas/' + lang.id);
    }

    function getLangTags(langId){
      etiquetasService.getLangTags(langId).then(function(tags){
        self.tags = getArrayFromJson(tags,20);
        self.totalTags = Object.keys(tags).length;
        self.langId = langId;
        focus('txtKey');
        self.form = {};
      });
    }

    function focus(input){
      var element = $window.document.getElementById(input);
      element.focus();
    }

    function getArrayFromJson(json, len){
      var ks = Object.keys(json);
      len = len || ks.length;
      var arr = [];
      for(var i = 0; i<= len -1; i++ ){
        var current = {};
        current.key = ks[i];
        current.value = json[current.key];
        arr.push(current);
      }

      return arr;
    }
  }

})(window.angular);
