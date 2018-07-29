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

/*Display Admin's Profile page
app.get('/', function (req, res) {
    res.render('admin-profile');
});
*/
/****** Code for when the Admin login pages are done*/
app.get('/', function (req, res) {
    if (req.session.admin_id) {
        console.log("Displaying Admin Profile");
        var context = {};
	var mysql = req.app.get('mysql');
        var query = "SELECT admin_email FROM Admins WHERE admin_id = ?";
        var inserts = [req.session.admin_id];
        mysql.pool.query(query, inserts, function (err, results) {
            if (err) {
                console.log(err);
                res.end();
            }
            console.log(results);
            context.admin = results[0];
            console.log("Admin to display:");
            console.log(context.admin);
            res.render('admin-profile', context);
        });
    } else {
        console.log("No valid session");
        res.redirect('/admin-sign-in');
    }
});
    
return app;
}();
