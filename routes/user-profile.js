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

// Display Organization Profile page
app.get('/', function (req, res) {
    if (req.session.u_id) {
        console.log("Displaying User Profile");
        var context = {};
	var mysql = req.app.get('mysql');
        var query = "SELECT fname, lname FROM Users WHERE u_id = ?";
        var inserts = [req.session.u_id];
        mysql.pool.query(query, inserts, function (err, results) {
            if (err) {
                console.log(err);
                res.end();
            }
            console.log(results);
            context.user = results[0];
            console.log("User to display:");
            console.log(context.user);
            res.render('user-profile', context);
        });
    } else {
        console.log("No valid session");
        res.redirect('/user-sign-in');
    }
});

    
return app;
}();
