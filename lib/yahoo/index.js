function Yahoo() {

};

Yahoo.prototype.balancesheet = function() {
  request('https://finance.yahoo.com/q/bs?s=AAPL', function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      var bs = $('#yfncsumtab');
      //console.log(bs.html());
      return bs;
    }
  });
};

module.exports = Yahoo;
