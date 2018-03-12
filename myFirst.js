const express = require('express');
const fetch = require('node-fetch')
const http = require('http');
const DOMParser = require('xmldom').DOMParser;
const xpathParser = require('xpath.js');
const urlParser = require('url');
const MongoClient = require('mongodb').MongoClient;
const qs = require('querystring');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

var mongourl = "mongodb://gifto_user:giftodb121@ds133776.mlab.com:33776/heroku_f2jnkg58";
var mongoDbName = "heroku_f2jnkg58"
const port = process.env.PORT || 8124;


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

// Enable CORS for development
app.use(cors());

// Static files
app.use(express.static(`${__dirname}/dist`));

// Log HTTP requests in the terminal
app.use(morgan('tiny'));

var editProduct = function(){};

app.route('/getProducts')
  .get((req, res) => {
      let handleData = function(data) {
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(JSON.stringify(data));
      };
      getProducts(req.params, handleData);
  });

app.route('/getProductDetails')
  .get((req, res) => {
      let handleData = function(data) {
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(JSON.stringify(data));
      };
      getProductDetails(req.query, handleData);
  });

app.route('/addProduct')
  .post((req, res) => {
      let handleData = function(data) {
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(JSON.stringify(data));
      };
      addProduct(req.params, req.body, handleData);
  });
app.listen(port, () => console.log(`JSON Server is running on port ${port}!`));


const defaultImageXpath = "//meta[@property='og:image']/@content";
const defaultDescriptionXpath = "//meta[@name='description']/@content";
const defaultTitleXpath = "//head/title/text()";

let titleXpaths = {};
let descriptionXpaths = {};
let imageXpaths = {"www.amazon.com":'//*[@id="landingImage"]/@src'};


var getProducts = function(query, handleData) {
    MongoClient.connect(mongourl, function(err, db) {
        if (err) throw err;
        var dbase = db.db(mongoDbName);
        dbase.collection("products").find({}).toArray( function(err, result) {
            if (err) {
                console.error("Error occured:"+err);
                throw err;
            }
            console.log("result:"+JSON.stringify(result));
            db.close();
            handleData(result);
        });});
};

var addProduct = function(query, formData, handleData) {
    MongoClient.connect(mongourl, function(err, db) {
        if (err) throw err;
        console.log("Form data {}", formData);
        var dbase = db.db(mongoDbName);
        const product = {url: formData.url, title: formData.title, description: formData.description, image:formData.image};
        console.log("Adding product:"+JSON.stringify(product));
        dbase.collection("products").insertOne(product, function(err, result) {
            if (err) {
                console.error("Error occured:"+err);
                throw err;
            }
            console.log("result:"+JSON.stringify(result));
            db.close();
            handleData(result);
        });});
};

var getProductDetails = function(query, handleData) {
    console.log('Fetching url',query.url);
    fetch(query.url)
        .then(res => res.text())
        .then(body => getDetails(query.url, body, handleData));
};

var getDetails = function(url, body, handleData) {
    var q = urlParser.parse(url, true);
    var doc = new DOMParser().parseFromString(body);
    console.log("getting for host: {}", q.host);

    function getDefaultIfNull(host, xpathMap, defaultXpath) {
        if(typeof xpathMap[host]!="undefined") {
            console.log("found xpath for host", xpathMap[host]);
            return xpathMap[host];
        }

        return defaultXpath;
    }

    let imageXpath = getDefaultIfNull(q.host, imageXpaths, defaultImageXpath);
    let titleXpath = getDefaultIfNull(q.host, titleXpaths, defaultTitleXpath);
    let descriptionXpath = getDefaultIfNull(q.host, descriptionXpaths, defaultDescriptionXpath);
    const product = {title: getXpathValue(doc,titleXpath), description: getXpathValue(doc,descriptionXpath), image:getXpathValue(doc,imageXpath)};
    console.log("product ",product);
    handleData(product);
}

var getXpathValue = function(doc, xpath) {
    var nodes = xpathParser(doc, xpath);
    if(typeof nodes !== 'undefined' && nodes.length > 0) {
        //console.log(nodes[0]);
        if(typeof nodes[0].data !== 'undefined')
            return nodes[0].data;
        if(typeof nodes[0].value !== 'undefined')
            return nodes[0].value;
    }
}

var urlMap = {'/getProducts':getProducts, '/getProductDetails':getProductDetails, '/addProduct': addProduct, '/editProduct': editProduct};
http.createServer(function (request, response) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Request-Method', '*');
    response.setHeader('Access-Control-Allow-Methods', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    var q = urlParser.parse(request.url, true);
    var query = q.query;
    console.log('Got request: {} method {} params {}',q.pathname,request.method, query);
    if (!(q.pathname in urlMap)) {
        console.log('Request url: {} not mapped', request.url);
        response.writeHead(404, 'Resource Not Found', {'Content-Type': 'text/html'});
        response.end('<!doctype html><html><head><title>404</title></head><body>404: Resource Not Found</body></html>');
    }
    var requestBody = '';
    if(request.method === "GET") {
        urlMap[q.pathname](query, function(data) {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(JSON.stringify(data));
        });
    } else if(request.method === "OPTIONS") {
        response.end();
    } else if(request.method === "POST") {
        request.on('data', function(data) {
            requestBody += data;
            if(requestBody.length > 1e7) {
                response.writeHead(413, 'Request Entity Too Large', {'Content-Type': 'text/html'});
                response.end('<!doctype html><html><head><title>413</title></head><body>413: Request Entity Too Large</body></html>');
            }
        });
        request.on('end', function() {
            var formData = qs.parse(requestBody);
            console.log("");
            urlMap[q.pathname](query, formData, function(data) {
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end(JSON.stringify(data));
            });
        });
    } else {
        response.writeHead(405, 'Method Not Supported', {'Content-Type': 'text/html'});
        return response.end('<!doctype html><html><head><title>405</title></head><body>405: Method Not Supported</body></html>');
    }
});
    // .listen(port);
// console.log('Server running at localhost:'+port);

