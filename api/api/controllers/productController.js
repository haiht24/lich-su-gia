'use strict';

var mongoose = require('mongoose'),
    Product = mongoose.model('Product');

exports.getProduct = function (req, res) {
    Product.find({productId: req.params.productId}, function (err, prd) {
        if (err) res.send(err);
        res.json(prd[0]);
    });
};