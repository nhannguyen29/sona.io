var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Song = require('../models/song');
var passport = require('passport');
var path = require('path');
var multer = require('multer');
var crypto = require('crypto');

var storage = multer.diskStorage({
    destination: 'public/uploads/songs/',
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err)

            cb(null, raw.toString('hex') + path.extname(file.originalname));
        });
    }
});

var upload = multer({ storage: storage });

router.get('/', function (req, res, next) {
    Song.getLatestSongs(function (err, rows) {
        res.render('songs/latest', {
            latestSongs: rows
        });
    });
});

router.get('/upload', function (req, res, next) {
    res.render('songs/upload');
});

// Upload song
router.post('/upload', upload.single('song_file'), function (req, res, next) {

    // Get input values
    var user_id = req.user.id;
    var songName = req.body.song_name;
    var songFile;

    if (req.file) {
        songFile = req.file.filename;
    }
    else // a work around for checking empty file issue. TODO: find a better way
    {
        req.checkBody('song_file', 'No file uploaded').notEmpty();
    }
    // Form Validation
    req.checkBody('song_name', 'Song needs a name.').notEmpty();


    errors = req.validationErrors();

    if (errors) {
        res.render('songs/upload', {
            errors: errors
        });
    }
    else {
        console.log('Uploading new song...');
        var date = new Date();
        var newSong = new Song(user_id, songName, songFile, date);
        Song.saveSong(newSong, function (err, result) {
            if (err) console.log(err);
            else {
                console.log("New song is added.\n");
                console.log("Result: " + result);
            };
        });
        req.flash('success_msg', "You have successfully uploaded the song.");

        res.redirect('/songs');
    }
});

router.post('/like/:song_id/:user_id', function (req, res, next) {
    var user_id = req.params.user_id;
    var song_id = req.params.song_id;
    Song.likeSong(song_id, user_id, function (err, result) {
        if (err) console.log(err);
        else {
            console.log("Liking song.\n");
            console.log("Result: " + result);
        };
    });
    req.flash('success_msg', "Successfully liked the song.");
});

router.get('mostfavorite', function(req, res, next) {
    Song.getMostFavorite(function(err,rows) {
        res.redirect('/songs/mostfavorite', {
            mostFavSongs: rows 
        });
    });
});
module.exports = router;