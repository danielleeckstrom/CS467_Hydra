module.exports = function(){
    var express = require('express');
    var router = express.Router();

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

        function getAwardType(res, mysql, context, complete){
            mysql.pool.query("SELECT at_id, award_name FROM Award_Type", function(error, results, fields){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.Award_Type = results;
                complete();
            });
        }

    
        /*Display create award page. */
    
        router.get('/', function(req, res){
            if (req.session.u_id) {
                var callbackCount = 0;
                var context = {};
                var mysql = req.app.get('mysql');
                getAwardType(res, mysql, context, complete);
                function complete(){
                    callbackCount++;
                    if(callbackCount >= 1){
                        res.render('createAward', context);
                    }
                }
            } else {
                res.redirect('/user-sign-in');
            }
        });
        /* createAward submitted, displays the Users previously granted awards in table below. */
    
        router.post('/', function(req, res){
            if (req.session.u_id) {
                console.log(req.body)
                var mysql = req.app.get('mysql');
                var sql = "INSERT INTO `Awards`(`award_type`, `award_time`, `award_date`, `r_fname`, `r_lname`, `r_email`, `user_id`) VALUES (?,?,?,?,?,?,?)";
//		        var uid = '1';
                var inserts = [req.body.aname, req.body.time, req.body.date, req.body.r_fname, req.body.r_lname, req.body.r_email, req.session.u_id ];
                sql = mysql.pool.query(sql,inserts,function(error, results, fields){
                    if(error){
                        console.log(JSON.stringify(error))
                        res.write(JSON.stringify(error));
                        res.end();
                    }else{
                        res.redirect('/user-profile');
                    }
                });
            } else {
                res.redirect('/user-sign-in');
            }
        });
    

        return router;
    }();

