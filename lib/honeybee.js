var request = require('request');
var cheerio = require('cheerio');
var sanitizeHtml = require('sanitize-html');
var fs = require('fs');

function Honeybee() {

};

Honeybee.prototype.apple = function() {
  request('http://finance.yahoo.com/q/bs?s=AAPL', function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      var bs = $('#yfncsumtab tr:nth-child(2) table:nth-child(2) td');
      //var bs = $('table .yfnc_tabledata1 tr td table').removeClass();
      //removeClass, removeAttr not working

      var clean = sanitizeHtml(bs.html(), {
                allowedTags: ['tr', 'td' ],
                allowedAttributes: {
                  'td': [ 'colspan' ],
                  'tr': [ 'rowspan' ]
                }
              });

      fs.writeFile('./test/dom.html',clean);
    }
  });
};

module.exports = Honeybee;
