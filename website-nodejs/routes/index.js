var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Lịch sử giá' });
});
router.get('/lich-su-gia/:productId', function (req, res) {
    // res.send(req.params);
    // var params = req.params;
    // var productId = params['productId'];
    // var getProduct = 'http://localhost:3333/product/' + productId;
    // request(getProduct, function(err, response, body){
    //     // res.send(response.body); //res is the response object, and it passes info back to client side
    //     res.render('product', {data: JSON.parse(response.body)});
    // });
    res.render('product');
});

module.exports = router;
