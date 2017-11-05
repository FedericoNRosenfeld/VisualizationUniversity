

/// --------------------------------------------    Authentication
var Codebird = require("cd/codebird");
// or with leading "./", if the codebird.js file is in your main folder:
// var Codebird = require("./codebird");



$(function() {

    $('#auth').click(function(e) {
        e.preventDefault();
        // es necesario preventDefault
        var cb = new Codebird;
        cb.setConsumerKey("8Vmq8hzhPIPjYc4EAfGQ3vlke", "8h2fSU4vYhLqeJJmpRQRv9JxwtUP6jkmBU4vgitWR6Gjt859Ov");
        cb.setToken("163239019-rJLe5uULgm7ZVDO8yPVstjugvQRSqB6LzEtiakAV", "FnOHS2LkDQfICIBmlwia4oCsfGrSx4ohBQPOmViuToBTU");
        ////////
        cb.__call(
            "oauth_accessToken",
            {oauth_verifier: document.getElementById("PINFIELD").value},
            function (reply,rate,err) {
                if (err) {
                    console.log("error response or timeout exceeded" + err.error);
                }
                if (reply) {
                    // store the authenticated token, which may be different from the request token (!)
                    cb.setToken(reply.oauth_token, reply.oauth_token_secret);
                }
                // if you need to persist the login after page reload,
                // consider storing the token in a cookie or HTML5 local storage
            }
        );

        //////// Application-only auth

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
       /////////// Requests with app-only auth

       cb.__call(
            "search_tweets",
            "q=Twitter",
            function (reply) {
                // ...
            },
            true // this parameter required
       );


    }
});
