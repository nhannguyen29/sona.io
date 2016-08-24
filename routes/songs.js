var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Song = require('../models/song');
var passport = require('passport');
var multer = require('multer');
var upload = multer({ dest: 'public/uploads/songs/' });

router.get('/', function(req, res, next) {
    Song.getLatestSongs(function(err,rows) {
            res.render('songs/latest', {
                latestSongs: rows
            });
    });
});
    
router.get('/upload', function(req, res, next) {
    res.render('songs/upload');
});

// Register User
router.post('/upload', upload.single('song_file'), function(req, res, next) {
    
    // Get input values
    var user_id     = req.user.id;
    var songName    = req.body.song_name;
    var songFile;
    if (req.file)
    {
        songFile    = req.file.filename;
    }
    // Form Validation
    req.checkBody('song_name', 'Song needs a name.').notEmpty();
//    req.checkBody('song_file', 'No file uploaded').notEmpty();

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
        Song.saveSong(newSong, function(err, result){
            if (err) console.log(err);
            else  {
                console.log("New song is added.\n");
                console.log("Result: " + result);
            };
        });
        req.flash('success_msg', "You have successfully uploaded the song.");
   
        res.redirect('/');        
    }// console.log(req.user);
       // console.log(req.file);
});

module.exports = router;