
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "id11053801_root",
    password:"Institutotechtudo2019",
    database:"chat",
    timezone: "UTC"
});

module.exports = connection;
