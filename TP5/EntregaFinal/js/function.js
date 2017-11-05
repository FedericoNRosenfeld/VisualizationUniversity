
var imagenes = [];

/// --------------------------------------------    Authentication
var Codebird = require("cd/codebird");
// or with leading "./", if the codebird.js file is in your main folder:
// var Codebird = require("./codebird");
var cb = new Codebird;
cb.setConsumerKey("8Vmq8hzhPIPjYc4EAfGQ3vlke", "8h2fSU4vYhLqeJJmpRQRv9JxwtUP6jkmBU4vgitWR6Gjt859Ov");
cb.setToken("163239019-rJLe5uULgm7ZVDO8yPVstjugvQRSqB6LzEtiakAV", "FnOHS2LkDQfICIBmlwia4oCsfGrSx4ohBQPOmViuToBTU");


        //////// Application-only auth
/*
        cb.__call(
            "oauth2_token",
            {},
            function (reply, err) {
                var bearer_token;
                if (err) {
                    console.log("error response or timeout exceeded" + err.error);
                }
                if (reply) {
                    bearer_token = reply.access_token;
                }
            }
       );
       */
       /////////// Requests with app-only auth

       var params = {
            q: "NYC";
        };

        cb.__call(
            "search_tweets",
            params,
            function (reply) {
                // ...
            }
        );


    }
});
