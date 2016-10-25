

(function(angular){

angular.module('app.settings')
.controller('settingsController', settingsController);

settingsController.$inject = ['$scope','$timeout'];
function settingsController($scope, $timeout){
  var self = this;

  self.form = {};
  self.chooseLocalLang = function() {
    openDialog(function(event, path, proc){
      self.form.localLang = path[0];
    });
  };

  self.chooseRemoteLang = function() {
    openDialog(function(event, path, proc){
      self.form.remoteLang = path[0];
    });
  };

  function openDialog(callback){
    var proc = require('electron').ipcRenderer;
    proc.send('open-file-dialog');
    proc.once('selected-directory', function(event, path){
      $timeout(callback(event, path));
    });
  }
}

})(window.angular);
