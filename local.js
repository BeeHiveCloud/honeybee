var fs = require('fs');
var h = require('./');
h.collect().then(function(result){
  fs.writeFile('./test/dom.html',result);
});
