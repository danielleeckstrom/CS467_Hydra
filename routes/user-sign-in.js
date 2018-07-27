module.exports = function(){
    var express = require('express');
    var app = express.Router();

/********************
 * TopNav
 ********************/
/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// Display User sign-in page
app.get('/', function (req, res) {
    res.render('user-sign-in');
});

// User sign-in
app.post('/', function (req, res) {
    var mysql = req.app.get('mysql');
    var email = req.body['user_email'];
    var password = req.body['user_password'];

    if (email != '' && password) {
        console.log("Logging in...");
        var query = "SELECT u_id, user_email FROM Users ";
        query = query + "WHERE user_email = ? AND user_password = ? LIMIT 1;";

        mysql.pool.query(query, [email, password], function (err, results) {
            if (err) {
                console.log(err);
            } else {
                if (results.length < 1) {
                    res.render('user-sign-in');
                } else {
                    console.log("Match found");
                    var user = results[0];
                    console.log(user);
                    req.session.u_id = user.u_id;
                    req.session.email = user.user_email;
                    res.redirect('/user-profile');
                }
            }
        });
    } else {
        res.redirect('/user-sign-in');
    }
});

return app;
}();
