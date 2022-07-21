const express = require('express');
const path = require('path');
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors());
// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '113eafab12b34e69b623ae6cda66cd35',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')
app.get('/', (req, res) => {
    rollbar.log('html loaded')
    res.sendFile(path.join(__dirname, '../front-end/index.html'))
})

app.get('/css', (req, res) => {
    rollbar.log('css loaded')
    res.sendFile(path.join(__dirname, '../front-end/styles.css'))
})

app.get('/js', (req, res) => {
    rollbar.log('front end js loaded')
    res.sendFile(path.join(__dirname, '../front-end/main.js'))
})

app.get('/js', (req, res) => {
    res.sendFile(path.join(__dirname, '../front-end/index.js'))
})

const port = process.env.PORT || 5501

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})