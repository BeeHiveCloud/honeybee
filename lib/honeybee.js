var request = require('request');
var cheerio = require('cheerio');

function Honeybee() {

};

Honeybee.prototype.apple = function() {
  request('http://finance.yahoo.com/q/bs?s=AAPL', function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      var bs = $('#yfncsumtab table:nth-child(2) table');
      console.log(bs.html());
    }
  });
};

module.exports = Honeybee;
