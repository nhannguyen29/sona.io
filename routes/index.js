var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.user) {
        res.redirect('/songs');
    }
    else {
        res.render('index');
    }
});

module.exports = router;
