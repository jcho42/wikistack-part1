const express = require('express');
const morgan = require('morgan');
const htmltag = require('html-template-tag');

const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res, next) => {
  res.send('hello world');
})

const PORT = 3000
app.listen(PORT,() => {console.log(`app is running on port: ${PORT}`)});
