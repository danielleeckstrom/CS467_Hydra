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
    
        /************************* Get User awards**********************/
        function getAwards(res, mysql, context, complete){
            var inserts = [context.id];
            var sql = "SELECT award_id AS id, Award_Type.award_name AS aname, award_time AS time, DATE_FORMAT(award_date,'%m-%d-%Y') AS prettydate, r_fname, r_lname, r_email FROM Awards INNER JOIN Award_Type ON Award_Type.at_id=Awards.award_type WHERE user_id = ?";
            mysql.pool.query(sql, inserts, function(error, results, field){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
                if (results[0]) {
                    context.Awards = results;
                    complete();
                } else {
                    res.redirect("/user-profile");
                }
            });
        }

        /*Display Awards granted. Requires web based javascript to delete Awards with AJAX*/
        app.get('/', function(req, res){
            if (req.session.u_id) {
                var callbackCount = 0;
                var context = {};
                context.id = [req.session.u_id];
                context.jsscripts = ["deleteAward.js"];
                var mysql = req.app.get('mysql');
                getAwards(res, mysql, context, complete);
                function complete(){
                    callbackCount++;
                    if(callbackCount >= 1){
                        res.render('user-awards', context);
                    }
                }
            } else {
                res.redirect('/user-sign-in');
            }
        });

        /* Route to delete Awards, simply returns a 202 upon success. Ajax will handle this. */
        app.delete('/:id', function(req, res){
	    console.log(req.params.id);
            var mysql = req.app.get('mysql');
            var sql = "DELETE FROM Awards WHERE award_id = ?";
            var inserts = [req.params.id];
            sql = mysql.pool.query(sql, inserts, function(error, results, fields){
                if(error){
                    res.write(JSON.stringify(error));
                    res.status(400);
                    res.end();
                }else{
                    res.status(202).end();
                }
            })
        })

    return app;
}();
