var Product = require('./app/models/product');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/db');

var prd = new Product({
    productId: 2548134,
    name: 'Bút cảm ứng Nam Viet (Đen)',
    href: '/but-cam-ung-nam-viet-den-2548134.html?ff=1',
    history: {
        priceFinal: '9900',
        discount: '-34%',
        oldPrice: '15000'
    }
});
// create
// prd.save(function (err) {
//     if(err) console.log(err);
//     console.log('Save product');
// });
// get all
Product.find({
    productId: 2800366
}, function (err, product) {
    if (err) throw err;
    product = product[0];

    product.name += '-Changed';

    product.save(function (err) {
        if (err) throw err;
        console.log('done');
    })
});
