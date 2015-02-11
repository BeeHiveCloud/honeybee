var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

var should = chai.should();

var honeybee = require('../');

describe('honeybee', function() {
  describe('#collect',function() {
    it('should return a promise', function(){
      honeybee.collect().should.eventually.be.ok;
    });
  })
});
