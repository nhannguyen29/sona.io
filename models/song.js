var mysql = require('mysql');
var conn = mysql.createConnection({
    host:       'localhost',
    user:       'root',
    password:   'Figara1996',
    database:   'sona_io'  
});

conn.connect();

var Song = function (name, composer, uri) {
    this.name       = name;
    this.composer   = composer;
    this.uri        = uri;
};


module.exports = Song;

module.exports.getLatestSongs = function(id, callback) {
    console.log("SELECT * FROM USERS WHERE id = " + "'" + id + "'");
    conn.query("SELECT * FROM USERS WHERE id = " + "'" + id + "'", function (err, rows, fields) {
        if (err) throw err;
        else {
            callback(err, rows[0]);
        }
    });
};
