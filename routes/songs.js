var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Song = require('../models/song');
var passport = require('passport');

router.get('/', function(req, res, next) {
    res.render('songs/latest');
});

router.get('/upload', function(req, res, next) {
    res.render('songs/upload');
});

// Register User
router.post('/upload', function(req, res, next) {
    
    // Get input values
    var user_id = req.user.id;
    var songName = req.body.song_name;
    var urlType = req.body.type;
    var url      = req.body.url;

    // Form Validation
    req.checkBody('song_name', 'Song needs a name.').notEmpty();
    req.checkBody('type', 'Need a type.').notEmpty();
    req.checkBody('url'     , 'Need a url.').notEmpty();
    errors = req.validationErrors();

    if (errors) {
        res.render('songs/upload', {
            errors: errors
        });
    }
    else {
        console.log('Uploading new song...');
        var date = new Date();
        var newSong = new Song(user_id, songName, url, urlType, date);
        Song.saveSong(newSong, function(err, result){
            if (err) console.log(err);
            else  {
                console.log("New song is added.\n");
                console.log("Result: " + result);
            };
        });
        req.flash('success_msg', "You have successfully uploaded the song.");
        res.redirect('/');        
    }
});

module.exports = router;