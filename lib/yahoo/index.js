function Yahoo( symbol ) {
  this.bs =
  {
      uri:'http://finance.yahoo.com/q/bs?s=' + symbol,
      selector:'#yfncsumtab tr:nth-child(2) table:nth-child(2) td',
      sanitize:
      {
        allowedTags: ['tr', 'td' ],
        allowedAttributes: {'td': [ 'colspan' ],'tr': [ 'rowspan' ]}
      },
      minify:
      {
        removeComments:true,
        collapseWhitespace:true,
        removeAttributeQuotes:true,
        removeEmptyAttributes: true,
        removeEmptyElements:true
      }
  }
};

module.exports = Yahoo;
