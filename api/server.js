var express = require('express'),
    app = express(),
    port = process.env.PORT || 3333,
    mongoose = require('mongoose'),
    Product = require('./api/models/productModel'),
    bodyParser = require('body-parser'),
    config = require('./config.json');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoDbConnectString);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/productRoutes');
routes(app);

app.listen(port);

console.log('todo list RESTful API server started on: %s', port);