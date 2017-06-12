const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const port = process.env.PORT || 3000;

var app = express();

MongoClient.connect(`mongodb://test:test@ds123752.mlab.com:23752/simpsonsquotes`, (err, db) => {
  if(err) throw err;

  app.get('/quotes', (req, res) => {
    let num = Number(req.query.count);

    num = !num ? 1 : num > 10 ? 10: num;
    db.collection('quotes').aggregate([{ $sample : {size : num }}], (err, doc) => {
      res.setHeader('Content-Type', 'application/json');
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

      res.send(doc);

    })
  });


  
  app.listen(port, () =>{
    console.log(`Listening on port ${port}`);
  });
});
