var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var producSchema = new Schema({
    productId: {type: Number, required: true, unique: true},
    name: String,
    href: String,
    history: Array,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
// on every save, add the date
producSchema.pre('save', function(next) {
    var currentDate = new Date();
    // change the updated_at field to current date
    this.updated_at = currentDate;
    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;
    next();
});
producSchema.methods.getLazadaCategories = function() {
    var request = require('request');
    var cheerio = require('cheerio');
    var fs = require('node-fs');
    var path = 'http://www.lazada.vn/store-directory/';
    var arrCats = [];
    request(path, function(error, response, body) {
        if(error) {console.log("Error: " + error);return;}
        if(response.statusCode === 200) {
            var data = [];
            var $ = cheerio.load(body);
            $('.c-store-directory__item a').each(function (i, el) {
                var cat = $(this).attr('href').trim() + '/?itemperpage=120&page=';
                arrCats.push(cat);
            });
            var json = JSON.stringify(arrCats);
            fs.writeFile('./configs/lazada-categories.json', json, null, function () {
                console.log('done write to file');
            });
        }else{
            console.log('Error status code: ', response.statusCode);
        }
    })
};

var Product = mongoose.model('Product', producSchema);
module.exports = Product;