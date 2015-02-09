var Promise = require('bluebird');
var request = require('request');
var cheerio = require('cheerio');
var sanitizeHtml = require('sanitize-html');
var minify = require('html-minifier').minify;

var yahoo = require('./yahoo');

function Honeybee() {
  this.nectar = null;
  this.pollen = null;
};

/*
* Public method collect
*/
Honeybee.prototype.collect = function() {
  y = new yahoo('AAPL');
  return parse(pr(y.bs.uri),y.bs);
};

/*
* private functions
*/
function pr(req){
    return new Promise(function(resolve,reject){
      request(req,function(error, response, body){
        resolve(body);
      }).on('error',function(){
        reject(error);
      });
    }
  );
};
function parse(pr,source){
  return pr.then(function(body){
    $ = cheerio.load(body);
    var dom = $(source.selector);
    var clean = sanitizeHtml(dom.html(),source.sanitize);
    var result = minify(clean, source.minify);
    return result;
  });
};

module.exports = Honeybee;
