var express = require('express');

var router = express.Router();



router.get('/', function(req, res, next) {

    var room_id = req.baseUrl.toString().split('').reverse().join('').substr(0,7);

    var context = {
        room_id: room_id
    };
    res.render('rooms', context);
});

module.exports = router;
