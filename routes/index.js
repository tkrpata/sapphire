var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var db = req.db;
    var collection = db.get('sapphire');
    var query = {};
    if(req.query.player) {
      query.player = req.query.player;
    }
    if(req.query.portal) {
      query.portal = req.query.portal;
    }

    if(req.query.start) {
      query.date = {};
      start = new Date(req.query.start);
      query.date.$gte = start;
    }

    if(req.query.end) {
      query.date = {};
      end = new Date(req.query.end);
      query.date.$lte = end;
    }

    console.log(query);

    collection.find(query,{},function(e,docs){
        res.json(docs);
    });
});

module.exports = router;
