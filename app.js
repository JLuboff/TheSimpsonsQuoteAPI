const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const port = process.env.PORT || 3000;

var app = express();

app.use(express.static(__dirname + '/public'));

MongoClient.connect(
  `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASS}@jl.qmwzj.mongodb.net/simpsonsquotes`,
  (err, client) => {
    if (err) throw err;

    app.get('/quotes', (req, res) => {
      const db = client.db('simpsonsquotes');
      let num = Number(req.query.count) || 1;

      num = num > 10 ? 10 : num;
      db.collection('quotes').aggregate(
        [
          { $sample: { size: num } },
          {
            $project: {
              _id: 0,
              character: 1,
              quote: 1,
              image: 1,
              characterDirection: 1,
            },
          },
        ],
        async (error, docCursor) => {
          if (error) throw error;
          const documents = [];
          await docCursor.forEach((document) => documents.push(document));
          res.setHeader('Content-Type', 'application/json');
          res.header('Access-Control-Allow-Origin', '*');
          res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
          );

          res.send(documents);
        }
      );
    });

    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  }
);
