const ts = require('typescript');

const options = {
  allowJs: true,
  noEmit: true,
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.CommonJS,
  moduleResolution: ts.ModuleResolutionKind.NodeJs
};

const prettifyDiagnostic = diagnostic => {
  if (diagnostic.file) {
    const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
    const messageText = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');

    return `${diagnostic.file.fileName} (Ln ${line + 1}, Col ${character + 1}): ${messageText}`
  } else {
    console.log(`${ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')}`);
  }
}

module.exports = (chai, utils) => {
  const Assertion = chai.Assertion;

  utils.addProperty(Assertion.prototype, 'types');

  utils.addChainableMethod(Assertion.prototype, 'validated', function () {
    const filename = utils.flag(this, 'object');
    const program = ts.createProgram([filename], options);
    const results = program.emit();

    const diagnostics = ts.getPreEmitDiagnostics(program).concat(results.diagnostics);

    try {
      new chai.Assertion(diagnostics).to.have.length(0);
    } catch (error) {
      const message = diagnostics.map(prettifyDiagnostic);

      throw new Error(message);
    }
  }, function () {
    utils.flag(this, 'types.validated', true);
  });
};
