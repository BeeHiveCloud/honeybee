Honey Bee [![npm version](https://badge.fury.io/js/honeybee.js.svg)](http://badge.fury.io/js/honeybee.js) [![Build Status](https://travis-ci.org/BeeHiveCloud/honeybee.svg)](https://travis-ci.org/BeeHiveCloud/honeybee)
=========
A lightweight web scraper

Status
------
Early stage, not properly tested yet

Configuration
-------------
Honeybee reads a json config object to understand how to collect an entity. The config object contains information like uri, selector etc, and it's organized by domain/entity hierarchy. Example:

```javascript
{
  "protocol":"http",
  "domain":"yahoo.com",
  "finance":{
    "subdomain": "finance",
    "directory": "q",
    "report":{
      "selector":"#yfncsumtab tr:nth-child(2) table:nth-child(2) td",
      "query":{"s":"~1"},
      "balancesheet":{"filename":"bs"},
      "cashflow":{"filename":"cf"},
      "incomestatement":{"filename":"is"}
    }
  }
}
```
Variables can be used in the config object, like '~1', which will be replaced by [target](#target) arguments list in order.
var# should be set according to config object hierachy.

Target
------
Target is a json path in the [configration](#configuration) object to locate the entity to be collected. Example: ```yahoo.finance.report.incomestatement```
Honeybee will read the target and load the configuration to extract uri to send request and selector to parse the response.


Usage
-----
```javascript
var honeybee = require('honeybee.js');
honeybee.target('yahoo.finance.report.incomestatement','FB');
honeybee.collect().then(function(result){
   fs.writeFile('dom.html',result);
 });
```

License
-------
The MIT License (MIT)

Copyright (c) 2015 Jerry Yang Jin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
