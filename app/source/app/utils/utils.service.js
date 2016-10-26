(function(angular){

  angular.module('app.utils',[])
  .service('utilsService', utilsService);

  utilsService.$inject = ['$mdDialog'];
  function utilsService($mdDialog){
    return {
      alert: alert
    };

    function alert(msg){

    }
    function createAlert($event,msg,title, type){
      type = type || 'alert';
      title = title || 'Alert';
      var mdAlert;

      if(type == 'alert'){
        mdAlert = $mdDialog.alert();
      } else if(type == 'error'){
        mdAlert = $mdDialog.alert();
      } else if(type == 'confirm'){
        mdAlert = $mdDialog.confirm();

        mdAlert.clickOutsideToClose(true)
        .title(title)
        .textContent(msg)
        .ok('Si')
        .cancel('No')
        .targetEvent($event);

        return $mdDialog.show(mdAlert);
      }

      mdAlert.clickOutsideToClose(true)
      .title(title)
      .textContent(msg)
      .targetEvent($event);

      $mdDialog.show(mdAlert);
    }
  }

})(window.angular);
