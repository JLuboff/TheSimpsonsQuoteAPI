const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(__dirname + '/public'));

const url = 'mongodb://root:example@mongodb:27017';

// Function to load data into MongoDB on startup
async function loadData() {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db('simpsonsquotes'); // Change 'mydb' to your desired database name
    const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, `/app/init_data/${process.env.DATAFILE}.json`), 'utf8'));

    await db.collection('quotes').insertMany(data); // Change 'mycollection' to your desired collection name
    console.log('Data imported successfully!');
    client.close();
  } catch (err) {
    console.error('Error importing data:', err);
  }
}

// Call the data loading method on server startup
loadData();

app.get('/quotes', async (req, res) => {
  try {
    /**
     * Connect to the database
     */
    const client = await MongoClient.connect(     
      `mongodb://root:example@mongodb:27017`
    );
    const db = client.db('simpsonsquotes');
    /**
     * Get the count of quotes requested and the character from query params
     */
    const {
      query: { count, character },
    } = req;
    const numOfQuotes = Number(count) || 1;

    /**
     * Create aggregate to limit the number of quotes returned by provided num
     * If no num is provided, return 1 quote
     */
    const aggregate = [
      { $sample: { size: numOfQuotes } },
      {
        $project: {
          _id: 0,
          character: 1,
          quote: 1,
          image: 1,
          characterDirection: 1,
        },
      },
    ];
    /**
     * If a character is provided, add a regex match (allows for partial names) to the aggregate
     */
    if (character) {
      aggregate.splice(0, 0, {
        $match: { character: { $regex: new RegExp(character, 'i') } },
      });
    }
    /**
     * Get the quotes from the database
     */
    const documents = await db.collection('quotes').aggregate(aggregate).toArray();
    /**
     * Close the connection to the database
     */
    client.close();
    /**
     * Send the quotes to the client
     */
    res.setHeader('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );

    res.send(documents);
  } catch (error) {
    /**
     * If an error occurs, send the error to the client
     */
    res.json(error.message);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
