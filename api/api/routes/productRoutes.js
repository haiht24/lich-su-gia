'use strict';
module.exports = function(app) {
    var prdCtrl = require('../controllers/productController');

    // Routes

    // Allow CORS
    app.all('*', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });
    // Get product by productId
    app.route('/product/:productId')
        .get(prdCtrl.getProduct);
};