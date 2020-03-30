# TheSimpsonsQuoteAPI
--------------
See for full usage: https://thesimpsonsquoteapi.glitch.me/

![](https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2Fsimpsons.PNG?1497481539770)

# Quote API -- Usage
-------------
#### In your JSON request use the following URL:
###### For basic usage with one quote on return:
```
https://thesimpsonsquoteapi.glitch.me/quotes
```

###### For multiple quotes, replace num with the number of quotes you'd like:
```
https://thesimpsonsquoteapi.glitch.me/quotes?count=num
```

###### The returned JSON data will contain four properties including the quote, the character who said the quote, an image of the character, and the direction in which the character is facing.
###### Example returned JSON: 
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
# SDK and Packages

# NodeJs
https://www.npmjs.com/package/simpsons-quote-api
## Usage: 
`npm i simpsons-quote-api`
```js
const simpsons = require('simpsons-quote-api')
async function logData() {
let data = await simpsons.getQuotes("0").catch((e) => {console.error(e)})
console.log(data)
}
logData()
```


# GoLang
https://github.com/C0braD3v/TheSimpsonsQuoteAPI-SDK-GO
## Usage
`go get https://github.com/C0braD3v/TheSimpsonsQuoteAPI-SDK-GO/src`
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
