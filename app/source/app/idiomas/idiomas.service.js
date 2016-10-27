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
      saveLanguage: saveLanguage,
      deleteLanguage: deleteLanguage
    };


    function getInstaledLanguages(){
      var defered = $q.defer();

      configService.readSettings().then(function(settings){

        var localFile = path.join(settings.localLang, languagesFile);
        //var remoteFile = path.join(settings.remoteLang, languages);

        //reading file to get languages
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

    function saveLanguage(lang){
      var defered = $q.defer();
      configService.readSettings().then(function(settings){
        //path to local languages file
        var localFile = path.join(settings.localLang, languagesFile);
        //path to local local id lang directory
        var langFolder = path.join(settings.localLang, lang.id);
        //path to new lang.json file
        var newLangFile = path.join(langFolder, 'lang.json');

        //reading installed languages
        getInstaledLanguages().then(function(languages){
          //verify if the new saved languages exists
          if(!__langExists(languages, lang.id)){
            //if not exists create langFolder directory
            fs.mkdir(langFolder, function(err){
              if(err) defered.reject(err);
              //create new lang.json file
              fs.writeFile(newLangFile, '{}','utf8', function(err){
                if(err)defered.reject(err);
                //update languages
                languages.push(lang);
                //get languages json string
                var languagesStr = JSON.stringify(languages);
                //write the new languages file
                fs.writeFile(localFile,languagesStr,'utf8', function(err){
                  if(err)defered.reject(err);
                  defered.resolve(true);
                });
              });
            });
          }
          else{
            //reject the defered if the supplied languages exists
            defered.reject({code: 'EXTLANG', description: 'Este idioma ya existe'});
          }
        });
      });
      return defered.promise;
    }

    function deleteLanguage(lang){
      var defered = $q.defer();

      configService.readSettings().then(function(settings){
        //path to local languages file
        var localFile = path.join(settings.localLang, languagesFile);
        //path to local lang id directory
        var langFolder = path.join(settings.localLang, lang.id);

        //read installed languages
        getInstaledLanguages().then(function(languages){
          var newLanguages = __removelanguage(languages, lang.id);

          //remove all files in the lang directory
          fs.readdir(langFolder, function(err, files){
            if(err)defered.reject(err);

            files.forEach(function(file){
              var fileToDelete = path.join(langFolder, file);
              fs.unlinkSync(fileToDelete);
            });

            //remove the lang directory
            fs.rmdir(langFolder, function(err){
              if(err) defered.reject(err);
              var jsonLanguages = JSON.stringify(newLanguages);
              //writing new json languages after delete
              fs.writeFile(localFile,jsonLanguages,'utf8', function(err){
                if(err)defered.reject(err);
                //if everything ok, then resolve defered
                defered.resolve(true);
              });
            });
          });


        });
      });
      return defered.promise;
    }


//Privates functions
    function __langExists(lang, id){

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

    function __removelanguage(languages, id){
      //return elements of the array diffetent of supplied id
      return languages.filter(function(e){
        return e.id != id;
      });
    }

  }

})(window.angular);
