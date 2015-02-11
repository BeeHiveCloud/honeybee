var Promise = require('bluebird');
var URI = require('URIjs');
var request = require('request');
var cheerio = require('cheerio');
var sanitizeHtml = require('sanitize-html');
var minify = require('html-minifier').minify;

var yahoo = require('./config/yahoo.json');
var options = require('./config/options.json');
const lookup = ['protocol','domain','subdomain','directory','filename','suffix'];

/**
 * Represents a Honeybee.
 * @constructor
 */
function Honeybee() {
  // public member
  this.nectar = "";
  this.pollen = "";
  this.uri = new URI();
  this.selector = "";

  // public method
  this.collect = collect;
  this.target = target;

  // private method
  this.pr = pr;
  this.pp = pp;
};

// public method
function collect() {
  return this.pp(this.pr(this.uri.toString()));
};

function target(entity,symbol){

  this.uri.protocol(yahoo.protocol);
  this.uri.domain(yahoo.domain);

  var n = entity.split('.');
  var obj = yahoo;

  for(var i in n){
    if(obj.hasOwnProperty(n[i])){
      obj = obj[n[i]];
      for(var attr in obj){
        if(lookup.indexOf(attr) > -1) {
          this.uri[attr](obj[attr]);
        }
        if(this.hasOwnProperty(attr)){
          this[attr] = obj[attr];
        }
      }
    }
  }
  this.uri.addQuery('s',symbol);
};

// private methods
function pr(uri){
    return new Promise(function(resolve,reject){
      request(uri,function(error, response, body){
        resolve(body);
      }).on('error',function(){
        reject(error);
      });
    }
  );
};

function pp(r){
  var selector = this.selector;
  return r.then(function(raw){
    $ = cheerio.load(raw);
    html = $(selector).html();
    html = sanitizeHtml(html,options.sanitize);
    html = minify(html, options.minify);
    return html;
  });
};


module.exports = Honeybee;
