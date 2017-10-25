const chai = require('chai');
const chaiAsTyped = require('../');
const expect = chai.expect;

chai.use(chaiAsTyped);

describe('Valid', function () {
  it('should...', function () {
    this.timeout(5000);

    const filename = __dirname + '/fixture/valid.js';

    expect(filename).to.have.type.verified();
  });
});
