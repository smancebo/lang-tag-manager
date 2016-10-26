
(function(angular){

  'use strict';

  var fs = require('fs');
  var configFile = './config.json';

  angular.module('app.settings')
  .service('settingsService', settingsService);

  settingsService.$inject = ['configService'];
  function settingsService(configService){

      function saveSettings(settings){
        return configService.saveSettings(settings);
      }

      function readSettings(){
        return configService.readSettings();
      }

    return {
      saveSettings: saveSettings,
      readSettings: readSettings
    };
  }


})(window.angular);
