var mysql = require('mysql');
var conn = mysql.createConnection({
    host:       'localhost',
    user:       'root',
    password:   'Figara1996',
    database:   'sona_io'  
});

conn.connect(function(err) {
    if (err) {
        console.log('Error: ' + err);
    }
    else {
        console.log('Database successfully connected');
    }
});

module.exports = conn;