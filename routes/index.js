var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //mongo connection

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/getSymbol', function(req, res) {
    mongoose.model('Symbol').find({name: req.body.symbol}, function (err, weights) {
        var weight = weights.length && weights[0];

        if (err) {
            return console.error(err);
        } else {
            //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
            res.format({
                //JSON response will show all blobs in JSON format
                json: function(){
                    res.json(weight);
                }
            });
        }
    });

});

router.post('/setSymbol', function(req, res) {
    var name = req.body.symbol;
    var data = req.body.weight;

    mongoose.model('Symbol').findOne({ name: name }, function (err, doc) {
      if (!doc) {
          mongoose.model('Symbol').create({
              name: name,
              data: data
          }, function (err, symbol) {
              if (err) {
                  res.send("There was a problem adding the information to the database.");
              } else {
                  console.log('POST creating new blob: ' + symbol);
                  res.format({
                      json: function () {
                          res.json(symbol);
                      }
                  });
              }
          })
      } else {
          doc.name = name;
          doc.data = data;
          // doc.visits.$inc();
          doc.save();
      }

    });


});


module.exports = router;
