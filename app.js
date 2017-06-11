const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const port = process.env.PORT || 3000;

var app = express();

MongoClient.connect('mongodb://localhost:27017/quotes', (err, db) => {
    if(err) throw err;

    app.get('/:num', (req, res) => {
      let num = Number(req.params.num);

      num = !num ? 1 : num > 10 ? 10: num;
      db.collection('quote').aggregate([{ $sample : {size : num }}], (err, doc) => {
        res.setHeader('Content-Type', 'application/json');
     res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        res.send(doc);
        console.log(doc);
      })
    });



  app.listen(port, () =>{
    console.log(`Listening on port ${port}`);
  });
});
