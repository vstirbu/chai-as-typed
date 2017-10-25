const ts = require('typescript');

const options = {
  allowJs: true,
  noEmit: true,
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.CommonJS,
  moduleResolution: ts.ModuleResolutionKind.NodeJs
};

module.exports = (chai, utils) => {
  const Assertion = chai.Assertion;

  utils.addProperty(Assertion.prototype, 'type');

  utils.addChainableMethod(Assertion.prototype, 'verified', function () {
    const filename = utils.flag(this, 'object');
    const program = ts.createProgram([filename], options);
    const results = program.emit();

    const diagnostics = ts.getPreEmitDiagnostics(program).concat(results.diagnostics);

    new chai.Assertion(diagnostics).to.have.length(0);
  }, function () {
    utils.flag(this, 'type.verified', true);
  });
};
