var Nightmare = require('nightmare');
var cheerio = require('cheerio');
var fs = require('node-fs');

var proxy = Nightmare({
    show: false
});
var userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36";
var site = 'http://www.gatherproxy.com/';
proxy.useragent(userAgent).goto(site).wait()
    .evaluate(function () {
        return document.body.innerHTML;
    })
    .then(function (result) {
        var $ = cheerio.load(result);
        var arr = [];
        $('.proxy').each(function (index, el) {
            var prx = $(this).attr('prx');
            arr.push(prx);
        });

        var json = JSON.stringify(arr);
        var fileName = './configs/proxy.json';
        fs.writeFile(fileName, json, null, function () {
            console.log('done write to file');
        });
    });