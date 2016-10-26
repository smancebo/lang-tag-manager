

(function(angular){

angular.module('app.settings')
.controller('settingsController', settingsController);

settingsController.$inject = ['$scope','$timeout','settingsService','$mdDialog'];
function settingsController($scope, $timeout, settingsService, $mdDialog){
  var self = this;

  self.form = {};
  self.chooseLocalLang = chooseLocalLang;
  self.chooseRemoteLang = chooseRemoteLang;
  self.saveSettings = saveSettings;
  self.readSettings = readSettings;

  self.readSettings();

  function saveSettings(sender){
    settingsService.saveSettings(self.form).then(function(result){
      var alert = $mdDialog.alert();

      alert.textContent('Cambios Guardados con Exito!')
      .title('Alerta!')
      .targetEvent(sender)
      .ok('Aceptar');
      $mdDialog.show(alert);
    });
  }

  function readSettings(){
    settingsService.readSettings().then(function(result){
      self.form = result;
    });
  }

  function chooseLocalLang() {
    openDialog(function(event, path, proc){
      self.form.localLang = path[0];
    });
  }

  function chooseRemoteLang() {
    openDialog(function(event, path, proc){
      self.form.remoteLang = path[0];
    });
  }

  function openDialog(callback){
    var proc = require('electron').ipcRenderer;
    proc.send('open-file-dialog');
    proc.once('selected-directory', function(event, path){
      $timeout(callback(event, path));
    });
  }
}

})(window.angular);
