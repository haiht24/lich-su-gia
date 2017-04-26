var cheerio = require('cheerio');
var Crawler = require("crawler");
var config = require('./configs/config.json');
var proxy = require('./configs/proxy.json');
var proxyChecker = require('./app/models/proxy');
var cron = require('node-cron');

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
    // proxy: "http://	24.46.33.160:40632",
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error) console.log(error);
        else{
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
            console.log('page:'+currentPage+'|found product:'+objProduct.length, res.request.uri.href);
            console.timeEnd('getData');
            if(objProduct.length > 0){
                for(var i = 0; i< objProduct.length; i++){
                    checkProductExist(objProduct[i]);
                }
                Product.insertMany(objProduct, {ordered: false}); // ordered = false => insert ignore duplicate
            }
        }
        done();
    }
});

var checkProductExist = function (product) {
    var id = product.productId;
    var newPrice = product.history.priceFinal;
    Product.findOne({productId: id}, function (err, prd) {
        if(err) return;
        if(prd){
            // if exist then push
            var historyLength = prd.history.length;
            var lastPrice = prd.history[historyLength - 1].priceFinal;
            // console.log(id,lastPrice, newPrice, lastPrice === newPrice);
            if(lastPrice !== newPrice){
                // push new price
                Product.update(
                    {productId: id},
                    { $push: { history: product.history } }, function (err) {
                        if(err) console.log(err);
                        else console.log(id + ' changed');
                    }
                );
            }
        }
    });
};

var arrPage = [];
// Queue just one URL, with default callback
var lazadaCats = require('./configs/lazada-categories.json');
lazadaCats = lazadaCats.toString().split(',');

// Get last category url to compare, detect when queue finish
var lastCat = lazadaCats[lazadaCats.length - 1];
console.time('getArrayUrl');

//=====================//==========================//
var cronCheckLazada = function () {
    console.log('Start check Lazada every hour');
    var CrawlCreateArrayUrl = new Crawler({
        rateLimit: 0,
        maxConnections: 1,
        // proxy: "http://88.159.148.1130:27608",
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
                try{
                    CrawlGetData.queue(data);
                }catch (err){
                    throw new Error(err);
                }

            }

            done();
        }
    });
    CrawlCreateArrayUrl.queue(lazadaCats);
};
cron.schedule('0 */2 * * *', cronCheckLazada);
// cronCheckLazada();
// return;