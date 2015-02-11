
var fs = require('fs');
var h = require('./');
h.target('finance.report.cashflow','FB');
h.collect().then(function(result){
  fs.writeFile('./test/dom.html',result);
});



/*

var yahoo = require('./lib/config/yahoo.json');

var URI = require('URIjs');

var uri = new URI();

const lookup = ['protocol','domain','subdomain','directory','filename','suffix'];

//console.log(uri['domain']('yahoo.com'));

function getType(obj){
  var type = Object.prototype.toString.call(obj).split(' ')[1];
  return type.substring(0,type.length - 1);
}

function query(str,s){

  var n = str.split('.');
  var obj = yahoo;
  var query;
  root();

  for(var i in n){
    if(obj.hasOwnProperty(n[i])){
      obj = obj[n[i]];
      for(var attr in obj){
        //console.log(attr+":"+obj[attr]);
        var type = getType(obj[attr]);
        var pos = lookup.indexOf(attr);
        if( type == "String" && pos > -1) {
          //console.log(attr+":"+obj[attr]);
          uri[attr](obj[attr]);
        }
        if(attr == "query" ){
          query = obj[attr];
        }
      }
    }
  }
  uri.addQuery(query,s);
  console.log(uri.toString());
};

function root(){
  for(var attr in yahoo){
    var type = getType(yahoo[attr]);
    if(type=="String"){
      uri[attr](yahoo[attr]);
    }
  };
  //console.log(uri.toString());
};

query('finance.report.cashflow','AAPL');
*/
