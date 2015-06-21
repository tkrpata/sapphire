var express = require('express');
var router = express.Router();
var request = require('request');

router.post('/', function(req, res, next) {
    var db = req.db;
    var collection = db.get('sapphire');

    var content = req.body.plain;
    var subject = req.body.headers.Subject;

    if(subject.match("Damage Report")) {

      console.log(subject);

      //var re = /Date: (.*?)$/gm;
      //var strdate = re.exec(content);
      //var date = new Date(strdate.replace(" at",""));

      var date = new Date(req.body.headers.Date);
      console.log("Date: " + date);

      console.log(content);

      var re = /ed by (.*?)$/gm;
      var frog = re.exec(subject)[1];
      console.log("Frog: " + frog);

      var re = /DAMAGE REPORT[\s]+(.*?)\n[\s](.*?)\n/gm;
      var location = re.exec(content);
      var portal = location[1];
      var address = location[2];
      console.log("Portal: " + portal);
      console.log("Address: " + address);

      var geocode_url = "http://maps.google.com/maps/api/geocode/json?address=" + encodeURIComponent(address) + "&sensor=false";
      var lat = 0.0;
      var lng = 0.0;
      request(geocode_url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          //console.log(body) 
          obj = JSON.parse(body);
          lat = obj.results[0].geometry.location.lat;
          lng = obj.results[0].geometry.location.lng;
          console.log(lat + "," + lng);

          // Just putting this here for now, it really doesn't go here
          var entry = { 'date': date, 'player': frog, 'portal': portal, 'address': address, 'lat':lat, 'lng':lng };
    
          collection.insert(entry, function(err, result){
            res.send(
              (err === null) ? { msg: '' } : { msg: err }
            );
          });
    
        }
      })

          } else if (subject.match("Forwarding Confirmation")) {
      console.log(subject);
      res.send();
    } else {
      console.log("Got an unknown message type from " + req.body.headers.From)
      res.send();
    }
});

module.exports = router;
