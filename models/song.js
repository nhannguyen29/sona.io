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

module.exports.likeSong = function (song_id, user_id, callback){
    console.log("User "+ user_id + " liked song " + song_id + ".\n");
    var likeQuery = "INSERT INTO REACTIONS (song_id, user_id) VALUES (" + song_id + ", " + user_id + ")";
    conn.query(likeQuery, function(err, result){
        callback(err, result);
    });
};

module.exports.getLatestSongs = function (callback) {
    var query = "SELECT s.id as song_id, s.song_name, s.song_file, s.uploadedDate, u.id as user_id, u.username \
                 FROM SONGS s INNER JOIN USERS u ON s.user_id = u.id ORDER BY uploadedDate DESC";
    console.log(query);
    conn.query(query, function (err, rows, fields) {
        if (err) throw err;
        else {
            callback(err,rows);
        }
    });
};

module.exports.getMostFavorite = function(callback) {
    var query = "select s.id as song_id, count(s.id) as like_count, u.username,\
                s.song_file, s.song_name, s.uploadedDate, s.user_id \
                from songs s join reactions r on s.id = r.song_id \
                join users u on s.user_id = u.id \
                group by s.id order by like_count desc;";
    console.log(query);
    conn.query(query, function(err, rows, fields){
        if (err) throw err;
        else {
            callback(err, rows);
        }
    });
};

module.exports.searchSongByKeyword = function(keyword, callback) {
    var query = "SELECT s.id as song_id, s.song_name, s.song_file, s.uploadedDate, u.id as user_id, u.username \
                 FROM SONGS s INNER JOIN USERS u ON s.user_id = u.id WHERE song_name LIKE '%" + keyword + "%';";

    conn.query(query, function(err, rows, fields) {
        if (err) throw err;
        else {
            callback(err, rows);
        }
    });
};