var Promise = require('bluebird');
var URI = require('URIjs');
var request = require('request');
var cheerio = require('cheerio');
var sanitizeHtml = require('sanitize-html');
var minify = require('html-minifier').minify;

//var yahoo = require('./config/yahoo.json');
var options = require('./config/options.json');
const lookup = ['protocol','domain','subdomain','directory','filename'];
var uri = new URI();

/**
 * Represents a Honeybee.
 * @constructor
 */
function Honeybee() {
  // public member
  this.uri = "";
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
  return this.pp(this.pr(this.uri));
};

function target(entity){
  var e = entity.split('.');
  var obj = require('./config/'+e[0]+'.json')

  uri.protocol(obj.protocol);
  uri.domain(obj.domain);

  for(var i in e){
    if(obj.hasOwnProperty(e[i])){
      obj = obj[e[i]];
      for(var attr in obj){
        if(lookup.indexOf(attr) > -1) { //handle uri properties
          uri[attr](obj[attr]);
        }
        if(this.hasOwnProperty(attr)){ //copy other properties
          this[attr] = obj[attr];
        }
        if(attr=="query"){ //handle query
          uri.setQuery(obj[attr]);
        }
      }
    }
  }

  var len = arguments.length;
  var result = uri.toString();
  console.log(result);

  //handle arguments
  if(len>1){
    for(i=1;i<len;i++){
      result = result.replace(/~(\d+)/g,arguments[i]);
    }
  }
  console.log(result);
  this.uri = result;
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
