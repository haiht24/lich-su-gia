var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Lịch sử giá' });
});

// router.get('/:slug/:productId', function(req, res, next) {
//     console.log(req);
//     res.render('index', { title: 'Lịch sử giá' });
// });

module.exports = router;
