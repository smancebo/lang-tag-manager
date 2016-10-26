(function(angular){

  'use strict';

  var fs = require('fs');
  var configFile = './config.json';

  angular.module('app.config',[])
  .service('configService', settingsService);

  settingsService.$inject = ['$q'];
  function settingsService($q){

      function saveSettings(settings){
        var defered = $q.defer();

        fs.writeFile(configFile, JSON.stringify(settings), function(err){
          if(err) defered.reject(err);
          defered.resolve(true);
        });
        return defered.promise;
      }

      function readSettings(){
        var defered = $q.defer();

        fs.exists(configFile, function(exists){
          if(exists){
            fs.readFile(configFile,'utf8', function(err, data){
              if(err) defered.reject(err);
              defered.resolve(JSON.parse(data.trim()));
            });
          }
          else {
            createConfig().then(function(){
              return readSettings();
            });
          }
        });
        return defered.promise;
      }

      function createConfig(){
        var defered = $q.defer();
        fs.writeFile(configFile,'{}','utf8', function(err){
          if(err) defered.reject(err);
          defered.resolve(true);
        });
        return defered.promise;
      }

    return {
      saveSettings: saveSettings,
      readSettings: readSettings
    };
  }

})(window.angular);
