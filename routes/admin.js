module.exports = function(){
    var express = require('express');
    var router = express.Router();

		function getAdmins(res, mysql, context, complete){
			mysql.pool.query(`
				SELECT
					*
				FROM Admins
				`, function(error, results, fields){
				if(error){

					console.log(JSON.stringify(error));
						res.write(JSON.stringify(error));
						res.end();
				}
				console.log(JSON.stringify(results));
				context.Admins = results;
				console.log("Calling callback");
				complete();
			});
		}

		function getAdmin(res, mysql, context, ID, complete){
        var sql = "SELECT * FROM Admins WHERE admin_id = ?";
        var inserts = [ID];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.Admin = results[0];
            complete();
        });
		}


    /*Display all Admins*/

    router.get('/', function(req, res){
			console.log("Rendering home page");
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteAdmin.js"];
        var mysql = req.app.get('mysql');

        function complete(){
					console.log("Rendering delete page");
            callbackCount++;
            if(callbackCount >= 1){
                res.render('admin', context);
            }

        }
				console.log("Query Database for Admins");
        getAdmins(res, mysql, context, complete);
				console.log("Got Admins");
    });

		/* Display one Admin for updating */

		router.get('/:ID', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateAdmin.js"];
        var mysql = req.app.get('mysql');
				getAdmin(res, mysql, context, req.params.ID, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update_admin.handlebars', context);
            }

        }
    });

		/* Adds a Admin, redirects to the action page after adding */

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Admins (admin_email, admin_password) VALUES (?,?)";
        var inserts = [req.body.admin_email, req.body.admin_password];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/admin');
            }
        });

    });

		/* The URI that update data is sent to in order to update a Admin */

    router.put('/:ID', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE Admins SET admin_password=? WHERE admin_id=?";
        var inserts = [req.body.admin_password, req.params.ID];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });

    /* Route to delete a Admin */

    router.delete('/:ID', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Admins WHERE admin_id = ?";
        var inserts = [req.params.ID];
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

		return router;

}();
