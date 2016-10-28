(function(angular){

  angular.module('app.etiquetas')
  .service('etiquetasService', etiquetasService);


  var fs = require('fs');
  var path = require('path');

  etiquetasService.$inject = ['$q','configService'];
  function etiquetasService($q, configService){


    return {
      getLangTags: getLangTags,
      saveLangTag: saveLangTag
    };

    function saveLangTag(id, tag){
      var defered = $q.defer();

      //get json from lang.json file
      getLangTags(id).then(function(langJson){
        //read config for write the file
        configService.readSettings().then(function(settings){
          langJson[tag.key.toLocaleUpperCase()] = tag.value;
          var langStr = JSON.stringify(langJson);
          var langFile = path.join(settings.localLang, id, 'lang.json');
          //write file to disk
          fs.writeFile(langFile, langStr ,'utf8', function(err){
            if(err)defered.reject(err);
            defered.resolve(true);
          });
        });
      });

      return defered.promise;
    }

    function getLangTags(id){
      var defered = $q.defer();
      //read lang settigns
      configService.readSettings().then(function(settings){
        //path to lang.json of the given lang
        var langFile = path.join(settings.localLang, id,'lang.json');
        //read lang.json
        fs.readFile(langFile, 'utf8', function(err, content){
          if(err) defered.reject(err);
          try {
            //parse file content to json for resolve promise
            var langJson = JSON.parse(content.trim());

            //resolve promise
            defered.resolve(langJson);

          } catch (e) {
            //if error occured then reject promise with the err object
            defered.reject(e);
          }
        });
      });
      return defered.promise;
    }


  }

})(window.angular);
