module.exports = function(){
    var express = require('express');
    var router = express.Router();

		function getUsersByRank(res, mysql, context, complete){
			mysql.pool.query(`
				SELECT fname, lname
				FROM Users
				INNER JOIN Awards ON Users.u_id = Awards.user_id
				GROUP BY Users.u_id
				ORDER BY COUNT(Awards.user_id) DESC;
				`, function(error, results, fields){
				if(error){

					console.log(JSON.stringify(error));
						res.write(JSON.stringify(error));
						res.end();
				}
				console.log(JSON.stringify(results));
				context.Users = results;
				console.log("Calling callback");
				complete();
			});
		}

		function awardsByYear(res, mysql, context, complete){
			mysql.pool.query(`
				SELECT Count(*) as Count,
							Year(award_Date) as Year
				FROM Awards
				GROUP BY Year(award_Date)
				LIMIT 5;
			`, function(error, results, fields){
				if(error){

					console.log(JSON.stringify(error));
						res.write(JSON.stringify(error));
						res.end();
				}
				console.log(JSON.stringify(results));
				context.Awards = results;
				console.log("Calling callback");
				complete();
			});
		}

		function getUsersByYear(res, mysql, context, complete){
			mysql.pool.query(`
				SELECT Users.fname as First_Name,
							 Users.lname as Last_Name,
							 Year(Awards.award_Date) as Year
				FROM Users
				INNER JOIN Awards ON Users.u_id = Awards.user_id
				GROUP BY Year(Awards.award_Date)
				ORDER BY Year(Awards.award_Date) DESC;
				`, function(error, results, fields){
				if(error){

					console.log(JSON.stringify(error));
						res.write(JSON.stringify(error));
						res.end();
				}
				console.log(JSON.stringify(results));
				context.Users_y = results;
				console.log("Calling callback");
				complete();
			});
		}
    /*Display all Users*/

    router.get('/', function(req, res){
			console.log("Rendering home page");
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');

        function complete(){
					console.log("Rendering delete page");
            callbackCount++;
            if(callbackCount >= 3){
                res.render('bio.handlebars', context);
            }

        }
				console.log("Query Database for users");
        getUsersByRank(res, mysql, context, complete);
				awardsByYear(res, mysql, context, complete);
				getUsersByYear(res, mysql, context, complete);
				console.log("Got users");
    });

		// /* Display one users for updating */
		//
		// router.get('/:ID', function(req, res){
    //     var callbackCount = 0;
    //     var context = {};
    //     context.jsscripts = ["updateUser.js"];
    //     var mysql = req.app.get('mysql');
		// 		getUser(res, mysql, context, req.params.ID, complete);
    //     function complete(){
    //         callbackCount++;
    //         if(callbackCount >= 1){
    //             res.render('update_user.handlebars', context);
    //         }
		//
    //     }
    // });
		//
		// /* Adds a user, redirects to the action page after adding */
		//
    // router.post('/', function(req, res){
    //     var mysql = req.app.get('mysql');
		// 		console.log("mysql");
    //     var sql = "INSERT INTO Users (fname, lname, user_email, user_password, image_link) VALUES (?,?,?,?,?)";
		// 		console.log("sql");
    //     var inserts = [req.body.fname, req.body.lname, req.body.user_email, req.body.user_password, req.body.image_link];
		// 		console.log("insert");
    //     sql = mysql.pool.query(sql,inserts,function(error, results, fields){
    //         if(error){
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }else{
		// 						console.log("Successfully added");
    //             res.redirect('/user');
    //         }
    //     });
		//
    // });
		//
		// /* The URI that update data is sent to in order to update a user */
		//
    // router.put('/:ID', function(req, res){
    //     var mysql = req.app.get('mysql');
		// 		console.log(mysql);
    //     var sql = "UPDATE Users SET fname=?, lname=?, user_password=? WHERE u_id=?";
		// 		console.log(sql);
    //     var inserts = [req.body.fname, req.body.lname, req.body.user_password, req.params.ID];
		// 		console.log(inserts);
    //     sql = mysql.pool.query(sql,inserts,function(error, results, fields){
    //         if(error){
		// 						console.log(JSON.stringify(error))
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }else{
		// 						console.log("OKAY")
    //             res.status(200);
    //             res.end();
    //         }
    //     });
    // });
		//
    // /* Route to delete a user */
		//
    // router.delete('/:ID', function(req, res){
    //     var mysql = req.app.get('mysql');
    //     var sql = "DELETE FROM Users WHERE u_id = ?";
    //     var inserts = [req.params.ID];
    //     sql = mysql.pool.query(sql, inserts, function(error, results, fields){
    //         if(error){
    //             res.write(JSON.stringify(error));
    //             res.status(400);
    //             res.end();
    //         }else{
    //             res.status(202).end();
    //         }
    //     })
    // })

		return router;

}();
