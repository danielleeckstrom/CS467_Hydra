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

// Display Admin sign-in page
app.get('/', function (req, res) {
    res.render('admin-sign-in');
});

// Admin sign-in
app.post('/', function (req, res) {
    var mysql = req.app.get('mysql');
    var email = req.body['admin_email'];
    var password = req.body['admin_password'];

    if (email != '' && password) {
        console.log("Logging in...");
        var query = "SELECT admin_id, admin_email FROM Admins ";
        query = query + "WHERE admin_email = ? AND admin_password = ? LIMIT 1;";

        mysql.pool.query(query, [email, password], function (err, results) {
            if (err) {
                console.log(err);
            } else {
                if (results.length < 1) {
                    res.render('admin-sign-in');
                } else {
                    console.log("Match found");
                    var admin = results[0];
                    console.log(admin);
                    req.session.admin_id = admin.admin_id;
                    req.session.email = admin.admin_email;
                    res.redirect('/admin-profile');
                }
            }
        });
    } else {
        res.redirect('/admin-sign-in');
    }
});

return app;
}();
