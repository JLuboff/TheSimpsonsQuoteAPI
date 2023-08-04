# TheSimpsonsQuoteAPI
--------------
See for full usage: https://thesimpsonsquoteapi.glitch.me/

![](https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2Fsimpsons.PNG?1497481539770)

# Quote API -- Usage
-------------
### In your JSON request use the following URL:


#### For basic usage with one quote on return:
```
https://thesimpsonsquoteapi.glitch.me/quotes
```

#### For multiple quotes, you can provide a `count` query with the number of quotes you'd like:
```
https://thesimpsonsquoteapi.glitch.me/quotes?count=num
```

#### For filtered character quotes, you can provide a `character` query and part or all of their name:
```
https://thesimpsonsquoteapi.glitch.me/quotes?character=ho //Would return a quote from Homer or Milhouse
https://thesimpsonsquoteapi.glitch.me/quotes?character=homer simpson //Would return a quote only from Homer
```

#### For filtered character and multiple quotes, you can provide a `character` and `num` query:
```
https://thesimpsonsquoteapi.glitch.me/quotes?count=15&character=ho //Would return up to 15 quotes from Homer and Milhouse
```

#### The returned JSON data will contain four properties including the quote, the character who said the quote, an image of the character, and the direction in which the character is facing.
#### Example returned JSON: 
```json
[
  {
   "quote": "Shoplifting is a victimless crime, like punching someone in the dark.",
   "character": "Nelson Muntz",
   "image" : "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FNelsonMuntz.png?1497567511185",
   "characterDirection" : "Left"
  }
]
```
-------------
# API Wrappers

# NodeJs
https://github.com/HPaulson/Simpsons-Quotes
### Usage

`npm install @hpaulson/simpsons-quotes  --registry=https://npm.pkg.github.com/hpaulson`

```js
const simpsons = require('@hpaulson/simpsons-quotes')

simpsons.getQuotes("0")
    .then((q) => {
        console.log(q)
    }).catch((e) => {
        console.error(e)
    })

```
Data Structure:

```js
require('@hpaulson/simpsons-quotes')
    .getQuotes("#") // Promise<Array, QuoteObject>

QuoteObject = {
    quote // String<Quote>
    image // String<ImageLink>
    character // String<Character>
    characterDirection // String<left | right>
}
```

# GoLang
https://github.com/HPaulson/Go-Simpsons-Quotes/
### Usage

`go get https://github.com/HPaulson/Go-Simpsons-Quotes/src`

```go
package main
import (
	"fmt"
	"log"
	simpsons "simpsons/simpsons"
)

func main() {
	data, err := simpsons.GetQuotes("0")
	if err != nil {
		log.Println(err)
	}
	fmt.Println(data[0].Quote)
}
```
Data Structure:

```go
simpsons {
	GetQuotes("<INT>") // Array<{data}>
}
	
data {
	Quote // String<Quote>
	Image // String<IMG_URL>
	Character // String<Character>
	CharacterDirection // String<Left | Right>
}
```
# Docker-Compose
### Run this locally

```
docker-compose build && docker-compose up
```
