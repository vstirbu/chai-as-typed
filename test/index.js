const chai = require('chai');
const chaiAsTyped = require('../');
const expect = chai.expect;

chai.use(chaiAsTyped);

describe('Types validation', function () {
  it('should succeed with correct types', function () {
    this.timeout(5000);

    const filename = __dirname + '/fixture/valid.js';

    expect(filename).to.have.types.validated();
  });

  it('should fail with wrong types', function () {
    this.timeout(5000);

    const filename = __dirname + '/fixture/invalid.js';

    try {
      expect(filename).to.have.types.validated();
    } catch (error) {}
  });
});
