var express = require('express');
var mongodb = require('./config/db');
var app = express();
var morgan = require('morgan');

app.use(morgan('dev'));

var port = process.env.PORT || 3246;
//db connected
mongodb();
app.use(express.json());

app.use('/assets', express.static(__dirname + '/public'));
// app.use(bodyparser.urlencoded({extended : false}));

app.use('/users', require('./routes/users'));

app.set('view engine', 'ejs');
app.listen(port, () => {
    console.log('App running on port: '+ port);
});
