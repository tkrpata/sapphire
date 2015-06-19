var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    var db = req.db;
    var collection = db.get('sapphire');

    var content = req.body.plain;
    console.log(content);

    var subject = req.headers.Subject;

    if(subject.match("Damage Report")) {
      var re = /Date: (.*?)$/gm;
      var date = re.exec(content)[1];
      console.log(date);

      var re = /attacked by (.*?)$/gm;
      var frog = re.exec(content)[1];
      console.log(frog);

      var re = /DAMAGE REPORT\n(.*?)\n(.*?)\n/gm;
      var location = re.exec(content);
      var portal = location[1];
      var address = location[2];
      console.log(portal);
      console.log(address);

      var entry = { 'date': date, 'player': frog, 'portal': portal, 'address': address };
    
      collection.insert(entry, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
      });
    } else if (subject.match("Gmail Forwarding Confirmation")) {
      console.log(subject);
    } else {
      console.log("Got an unknown message type from " + req.headers.From)
    }
});

module.exports = router;
