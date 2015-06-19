var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    var db = req.db;
    var collection = db.get('sapphire');
    console.log(req.body.plain);
    collection.insert(req.body.plain, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

module.exports = router;
