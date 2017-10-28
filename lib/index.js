const ts = require('typescript');

const options = {
  allowJs: true,
  noEmit: true,
  target: ts.ScriptTarget.ES2017,
  module: ts.ModuleKind.CommonJS,
  moduleResolution: ts.ModuleResolutionKind.NodeJs
};

const prettifyDiagnostic = (diagnostic) => {
  const position = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
  const line = position.line;
  const character = position.character;
  const messageText = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');

  return `${diagnostic.file.fileName} (Ln ${line + 1}, Col ${character + 1}): ${messageText}`
};

module.exports = (chai, utils) => {
  const Assertion = chai.Assertion;

  const getObjectDiagnostics = (target) => {
    const filename = utils.flag(target, 'object');
    const program = ts.createProgram([filename], options);
    const results = program.emit();

    return ts.getPreEmitDiagnostics(program).concat(results.diagnostics);
  };

  utils.addProperty(Assertion.prototype, 'types');

  utils.addChainableMethod(Assertion.prototype, 'validated', function () {
    const diagnostics = getObjectDiagnostics(this);

    try {
      new chai.Assertion(diagnostics).to.have.length(0);
    } catch (error) {
      const message = diagnostics.map(prettifyDiagnostic);

      throw new Error(message);
    }
  }, function () {
    utils.flag(this, 'types.validated', true);
  });

  utils.addChainableMethod(Assertion.prototype, 'errors', function (expectedErrors) {
    const diagnostics = getObjectDiagnostics(this);

    if (expectedErrors) {
      new chai.Assertion(diagnostics).to.have.length(expectedErrors);
    } else {
      new chai.Assertion(diagnostics).to.have.length.above(0);
    }
  }, function () {
    utils.flag(this, 'types.errors', true);
  })
};
