var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs467-group2',
  password        : 'hggyNJdECzgoRFwL',
  database        : 'cs467-group2'
});
module.exports.pool = pool;
