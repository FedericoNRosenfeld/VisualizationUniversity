
var imagenes = [];

/// --------------------------------------------    Authentication
//var Codebird = require("cd/codebird");
// or with leading "./", if the codebird.js file is in your main folder:
// var Codebird = require("./codebird");
var cb = new Codebird;
cb.setConsumerKey("8Vmq8hzhPIPjYc4EAfGQ3vlke", "8h2fSU4vYhLqeJJmpRQRv9JxwtUP6jkmBU4vgitWR6Gjt859Ov");
cb.setToken("163239019-rJLe5uULgm7ZVDO8yPVstjugvQRSqB6LzEtiakAV", "FnOHS2LkDQfICIBmlwia4oCsfGrSx4ohBQPOmViuToBTU");


       var params = {
            //%23  = #
            // q: consulta que se haria
            q: "NYC"
        };
// Tema de las entidades para los parametros
// https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/extended-entities-object


/*
{"entities": {
   "hashtags": [
     {
       "text": "hashtag"
     }
   ]
}
}

{
"extended_entities": {
   "media":[
      {
        "type": "photo"
      }
  ]
}
}
*/
        cb.__call(
            "search_tweets",
            params,
            function (reply) {
                // ...
            }
        );


    }
});
