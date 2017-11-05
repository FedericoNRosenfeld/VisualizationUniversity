
var imagenes = [];

/// --------------------------------------------    Authentication
//var Codebird = require("cd/codebird");
// or with leading "./", if the codebird.js file is in your main folder:
// var Codebird = require("./codebird");
var cb = new Codebird;
cb.setConsumerKey("8Vmq8hzhPIPjYc4EAfGQ3vlke", "8h2fSU4vYhLqeJJmpRQRv9JxwtUP6jkmBU4vgitWR6Gjt859Ov");
cb.setToken("163239019-rJLe5uULgm7ZVDO8yPVstjugvQRSqB6LzEtiakAV", "FnOHS2LkDQfICIBmlwia4oCsfGrSx4ohBQPOmViuToBTU");

 var params = {
   // q: consulta que se haria
      q: "NYC"

  };

cb.__call(
"search_tweets",
params,
function (reply) {
 for (var i = 0; i < reply.statuses.length; i++) {
  // var pertenece = false;
   var twitter = reply.statuses[i];
   if(( twitter.extended_entities && twitter.extended_entities.media[0].type == "photo" ){
     /*
     var hasht = twitter.entities.hashtags;
     for (var j = 0; j < hasht.length; j++) {
         if ( hasht[i].text == params.q){
            pertenece = true;
         }
     }
     if (pertenece){ */
       var paquete = {
           // https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/extended-entities-object
           url: twitter.extended_entities.media[0].media_url_https,
           //https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/tweet-object
           likes: twitter.favorite_count
       }
        imagenes.push(paquete);
     }
   }
 }
  cargarImagenes();// la encargada de mandar las imagenes a la pagina
}
);


function cargarImagenes(){
  for (var i = 0; i < imagenes.length; i++) {
      // unir esto con los contenedores correspondientes
  }
}
