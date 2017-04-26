var request = require('request');
var cheerio = require('cheerio');
var Crawler = require("crawler");
var url = require('url');
var fs = require('node-fs');
var config = require('./configs/config.json');

//////////////////////////////// CONFIG ////////////////////////////////
var rateLimit = config.rateLimit;
var maxConnections = config.maxConnections;
////////////////////////////////////////////////////////////////////////

var Product = require('./app/models/product');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoDbConnectString);

var product;
var CrawlGetData = new Crawler({
    rateLimit: rateLimit,
    maxConnections: maxConnections,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            var currentPage = $('.c-paging__link.c-paging__link-current').text().trim();
            var objProduct = [];
            $('.c-product-card').each(function (i, el) {
                var box = $(this);
                var href = box.find('.c-product-card__img-placeholder-inner').attr('href').trim();
                // find product id match -123456.html
                var m = href.match(/[-]\d{1,9}.html/g);
                var productId = 0;
                if(m){
                    productId = m[0].toString().replace('.html', '').replace('-','');
                }
                var name = box.find('.c-product-card__name').text().trim();
                var priceFinal = Number(box.find('.c-product-card__price-final').text().trim().replace(' VND', '').replace(/\./g,''));
                var oldPrice = Number(box.find('.c-product-card__old-price').text().trim().replace(' VND', '').replace(/\./g,''));
                var discount = box.find('.c-product-card__discount').text().trim();
                product = {
                    productId: parseInt(productId),
                    name: name,
                    href: href,
                    history: {
                        priceFinal: priceFinal,
                        discount: discount,
                        oldPrice: oldPrice,
                        created_at: new Date()
                    }
                };
                objProduct.push(product);
            });
            var json = JSON.stringify(objProduct);
            var fileName = 'products-' + currentPage + '.json';
            // save object to json file when current page = 100
            // if(currentPage == maxPage){
                // fs.writeFile(fileName, json, null, function () {
                //     console.log('done write to file: ' + currentPage);
                // });
                // Product.create(objProduct, function (err, prd) {
                //     if(err) throw err;
                //     console.log('done');
                // })
                console.log('page:'+currentPage+'|found product:'+objProduct.length, res.request.uri.href);
                console.timeEnd('getData');
                if(objProduct.length > 0){
                    Product.insertMany(objProduct, {ordered: false}); // ordered = false => insert ignore duplicate
                }

            // }
        }
        done();
    }
});

var arrPage = [];
// Queue just one URL, with default callback
var lazadaCats = require('./configs/lazada-categories.json');
lazadaCats = lazadaCats.toString().split(',');
var CrawlCreateArrayUrl = new Crawler({
    rateLimit: 0,
    maxConnections: 1,
    callback: function (error, res, done) {
        var $ = res.$;
        var maxPage = $('.c-paging__link').last().text().trim();
        if(!maxPage)
            maxPage = 1;
        var thisUrl = res.request.uri.href;
        var a = {url: thisUrl, maxPage: maxPage};
        arrPage.push(a);
        console.log(thisUrl, maxPage);
        if(thisUrl === lastCat){
            // finish get highest page, generate array contain urls will crawl
            var data = [];
            for(var i=0;i<arrPage.length;i++){
                var mp = parseInt(arrPage[i].maxPage);
                var u = arrPage[i].url;
                for(var j=1;j<mp+1;j++){
                    data.push(u+j);
                }
            }
            // console.log(data);
            console.timeEnd('getArrayUrl');
            console.time('getData');
            console.log('===========================================================================');
            CrawlGetData.queue(data);
        }

        done();
    }
});
// Get last category url to compare, detect when queue finish
var lastCat = lazadaCats[lazadaCats.length - 1];
console.time('getArrayUrl');
CrawlCreateArrayUrl.queue(lazadaCats);
return;

// Update
// var update = Product.update(
//     {productId: 3164686},
//     { $push: { history: {oldPrice: 9999, discount: "-50%", priceFinal: 8888} } }, function (err) {
//         if(err){
//             console.log(err);
//         }else{
//             console.log('success');
//         }
//     }
// );

// Find product by id
// var find = Product.find({productId: 3164686}, function (err, prd) {
//     console.log(err);
//     console.log(prd);
//     if(prd.length > 0)
//         console.log(prd[0].history);
// });

// var time = calcTime('2017-04-13 09:53:39.773Z', 7);
// console.log(time);
// function calcTime(dateString, timeZone) {
//     var d = new Date(dateString);
//     var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
//     var nd = new Date(utc + (3600000*timeZone));
//     return nd.toLocaleString();
// }

// for(var i = 0; i < lazadaCats.length; i++){
//     var path = lazadaCats[i];
//     request(path, function(error, response, body) {
//         if(error) {console.log("Error: " + error);return;}
//         if(response.statusCode === 200) {
//             var data = [];
//             var $ = cheerio.load(body);
//             var maxPage = $('.c-paging__link').last().text().trim();
//             console.log(maxPage);
//         }else{
//             console.log('Error status code: ', response.statusCode);
//         }
//     })
// }

// var cat = 'http://www.lazada.vn/dien-thoai-may-tinh-bang/?itemperpage=120&page=';
// for(var i = 1; i < maxPage + 1; i++){
//     arrPage.push(cat + i);
// }

// start get product from category
// c.queue(arrPage);

// get list categories from lazada
// var prd = new Product();
// prd.getLazadaCategories();