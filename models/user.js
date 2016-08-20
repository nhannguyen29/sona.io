var bcrypt = require('bcryptjs');
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

var User = function (firstName, lastName, email, username, password) {
    this.firstName  = firstName;
    this.lastName   = lastName;
    this.email      = email;
    this.username   = username;
    this.password   = password;
};


module.exports = User;

module.exports.saveUser = function(newUser, callback) {
    bcrypt.hash(newUser.password, 10, function(err, hash){
        if (err) throw err;
        else {
            newUser.password = hash;
            console.log("New user is being saved");
            var user = {
                first_name: newUser.firstName,
                last_name:  newUser.lastName,
                email:      newUser.email,
                username:   newUser.username,
                password:   newUser.password
            };
            conn.query("INSERT INTO USERS SET ?", user, function(err, result) {
                callback(err, result);
            });
        } 
    });
};

module.exports.getUserById = function(id, callback) {
    console.log("SELECT * FROM USERS WHERE id = " + "'" + id + "'");
    conn.query("SELECT * FROM USERS WHERE id = " + "'" + id + "'", function (err, rows, fields) {
        if (err) throw err;
        else {
            callback(err, rows[0]);
        }
    });
};

module.exports.getUserByUsername = function(username, callback) {
    console.log("SELECT * FROM USERS WHERE username = " + "'" + username + "'");
    conn.query("SELECT * FROM USERS WHERE username = " + "'" + username + "'" , function (err, rows, fields) {
        if (err) throw err;
        else {
            callback(err, rows[0]);
        }
    });
};

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if (err) throw err;
        else {
            callback(null, isMatch);
        }
    });
};