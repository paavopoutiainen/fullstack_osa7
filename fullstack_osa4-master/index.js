//Tämä tiedosto huolehtii sovelluksen käynnistämisestä
//tuodaan express sovellus 
const app = require("./app")
//importataan http moduuli, 
const http = require('http')
const config = require("./utils/config")
//http server olio voi kuunnella portteja
const server = http.createServer(app) 

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})