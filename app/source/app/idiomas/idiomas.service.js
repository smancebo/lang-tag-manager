  /*jshint esversion: 6 */
(function(angular){

  var fs = require('fs');
  var path = require('path');
  const languagesFile = 'languages.json';

  angular.module('app.idiomas')
  .service('idiomasService', idiomasService);

  idiomasService.$inject = ['configService', '$q'];
  function idiomasService(configService, $q){
    return {
      getInstaledLanguages: getInstaledLanguages,
      saveLanguage: saveLanguage

    };


    function getInstaledLanguages(){
      var defered = $q.defer();

      configService.readSettings().then(function(settings){

        var localFile = path.join(settings.localLang, languagesFile);
        //var remoteFile = path.join(settings.remoteLang, languages);

        fs.readFile(localFile,'utf8',function(err, data){
          if(err)defered.reject(err);
          try{
            var lang = JSON.parse(data.trim());
            defered.resolve(lang);
          }
          catch(e){
            defered.reject(e);
          }
        });
      });
      return defered.promise;
    }

    function langExists(lang, id){

      if(lang instanceof Array){
        var element = lang.filter(function(e){
          return e.id == id;
        });
        if(element.length > 0){
          //existe
          return true;
        }
        else {
          return false;
        }
      }
      else {
        throw 'not an array';
      }
    }

    function saveLanguage(lang){
      var defered = $q.defer();
      configService.readSettings().then(function(settings){
        var localFile = path.join(settings.localLang, languagesFile);
        var langFolder = path.join(settings.localLang, lang.id);
        var newLangFile = path.join(langFolder, 'lang.json');
        getInstaledLanguages().then(function(languages){
          if(!langExists(languages, lang.id)){

            fs.mkdir(langFolder, function(err){
              if(err) defered.reject(err);
              fs.writeFile(newLangFile, '{}','utf8', function(err){
                if(err)defered.reject(err);
                languages.push(lang);
                var languagesStr = JSON.stringify(languages);
                fs.writeFile(localFile,languagesStr,'utf8', function(err){
                  if(err)defered.reject(err);
                  defered.resolve(true);
                });
              });
            });
          }
          else{
            defered.reject({code: 'EXTLANG', description: 'Este idioma ya existe'});
          }
        });
      });
      return defered.promise;
    }
  }

})(window.angular);
