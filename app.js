const express = require('express');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(__dirname + '/public'));

const quotesFilePath = path.join(__dirname, 'quotes.json');
const quotes = JSON.parse(fs.readFileSync(quotesFilePath, 'utf8'));

// Fisher-Yates (Knuth) shuffle algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

app.get('/quotes', (req, res) => {
  try {
    const {
      query: { count, character },
    } = req;
    const numOfQuotes = Number(count) || 1;

    // Shuffle the array of quotes
    const shuffledQuotes = shuffleArray(quotes);

    // Filter quotes based on partial character matching
    const filteredQuotes = character
      ? shuffledQuotes.filter((quote) =>
          quote.character.toLowerCase().includes(character.toLowerCase())
        )
      : shuffledQuotes;

    // Select a subset of quotes
    const selectedQuotes = filteredQuotes.slice(0, numOfQuotes);

    res.setHeader('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    res.send(selectedQuotes);
  } catch (error) {
    res.json(error.message);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
