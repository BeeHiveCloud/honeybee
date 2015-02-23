var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

var should = chai.should();

var honeybee = require('../');

describe('honeybee', function() {
  describe('#collect',function() {
    it('should be ok', function(){
      honeybee.target('yahoo.finance.profile','FB');
      honeybee.collect().should.eventually.be.ok;
    });
  })
});
