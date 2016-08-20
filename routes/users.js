var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

/* User Register */
router.get('/register', function(req, res, next) {
    res.render('users/register');
});

// Register User
router.post('/register', function(req, res, next) {
  
    // Get input values
    var firstName   = req.body.firstName;
    var lastName    = req.body.lastName;
    var email       = req.body.email;
    var username    = req.body.username;
    var password    = req.body.password;
    var password2    = req.body.password2;

    // Form Validation
    req.checkBody('firstName', 'First name is required').notEmpty();
    req.checkBody('lastName' , 'Last name name is required').notEmpty();
    req.checkBody('email'    , 'Email is required').notEmpty();
    req.checkBody('username' , 'Username is required').notEmpty();
    req.checkBody('password' , 'Password is required').notEmpty();  
    req.checkBody('password2', 'Confirm password does not match').equals(req.body.password);

    errors = req.validationErrors();

    if (errors) {
        res.render('users/register', {
            errors: errors
        });
    }
    else {
        console.log('Registering new user...');
        var newUser = new User(firstName, lastName, email, username, password);
        User.saveUser(newUser, function(err, result){
            if (err) {
                console.log(err);
            }
            else {
                console.log("New user is added");
                console.log('Result: ' + result);
            }
        });   
        req.flash('success_msg', "You have successfully registered. Please log in");
        res.redirect('/');        
    }
});

passport.serializeUser(function(user, done) {
    done(null, user.id);
});


passport.deserializeUser(function(id, done) {
    User.getUserById(id, function (err, user) {
        done(err, user);
    });
});

router.post('/login', passport.authenticate('local', {failureRedirect:'/', failureFlash: true}), function(req,res,next) {
    req.flash('success_msg', "You are now logged in");
    res.redirect('/songs');
});

passport.use(new LocalStrategy(
    function(username, password, done) {
  	    User.getUserByUsername(username, function(err, user){
    	    if (err) throw err;
    	    if(!user){
    		    return done(null, false, { message: 'Unknown user ' + username }); 
    	    }

    	    User.comparePassword(password, user.password, function(err, isMatch) {
      		    if (err) return done(err);
      		    if(isMatch) {
        		    return done(null, user);
      		    } else {
      			    console.log('Invalid Password');
      			    // Success Message
        		    return done(null, false, { message: 'Invalid password' });
      		    }
   	 	    });
        });
    }
));

router.get('/logout', function (req, res) {
    req.logout();
    // Success message
    req.flash('success_msg', "You have logged out");
    res.redirect('/');
});

module.exports = router;
