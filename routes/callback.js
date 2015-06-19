var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    var db = req.db;
    var collection = db.get('sapphire');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

module.exports = router;
