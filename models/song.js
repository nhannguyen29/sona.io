var conn = require('../db');
var moment = require('moment');

function twoDigits(d) {
    if (0 <= d && d < 10) return "0" + d.toString();
    if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
    return d.toString();
}

var toMysqlFormat = function () {
    var date = Date();
    return date.getUTCFullYear() + "-" + twoDigits(1 + date.getUTCMonth()) + "-" + twoDigits(date.getUTCDate()) + " " + twoDigits(date.getUTCHours()) + ":" + twoDigits(date.getUTCMinutes()) + ":" + twoDigits(date.getUTCSeconds());
};

var Song = function (user_id, song_name, song_file, uploadedDate) {
    this.song_name = song_name;
    this.song_file = song_file;
    this.user_id = user_id;
    this.uploadedDate = uploadedDate;
};

module.exports = Song;

module.exports.saveSong = function (newSong, callback) {
    console.log("New song is being saved.\n");
    var date = moment().format('YYYY-MM-DD HH:mm:ss');
    var song = {
        user_id: newSong.user_id,
        song_name: newSong.song_name,
        song_file: newSong.song_file,
        uploadedDate: date
    };
    conn.query("INSERT INTO SONGS SET ?", song, function (err, result) {
        callback(err, result);
    });
};

module.exports.getLatestSongs = function (callback) {
    console.log("SELECT * FROM SONGS s INNER JOIN USERS u ON s.user_id = u.id ORDER BY uploadedDate DESC");
    conn.query("SELECT * FROM SONGS s INNER JOIN USERS u ON s.user_id = u.id ORDER BY uploadedDate DESC", function (err, rows, fields) {
        if (err) throw err;
        else {
            callback(err,rows);
            
        }
    });
};
