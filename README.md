# chai-as-typed

[![Build Status](https://travis-ci.org/vstirbu/chai-as-typed.svg?branch=master)](https://travis-ci.org/vstirbu/chai-as-typed)
[![Coverage Status](https://coveralls.io/repos/github/vstirbu/chai-as-typed/badge.svg?branch=master)](https://coveralls.io/github/vstirbu/chai-as-typed?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/vstirbu/chai-as-typed.svg)](https://greenkeeper.io/)

## Motivation

[TypeScript](https://www.typescriptlang.org/) has now the ability to do [type checking](https://github.com/Microsoft/TypeScript/wiki/Type-Checking-JavaScript-Files) in plain JavaScript files. This behavior is not based on magic, but on well formed JSDoc [comments](https://github.com/Microsoft/TypeScript/wiki/JSDoc-support-in-JavaScript).

Now, if I have a JavaScript file augmented with the proper JSDoc comments, an editor such as [Visual Studio Code]() will be able to automatically get IntelliSense, which includes autocompletion and type checking:

![](https://raw.github.com/vstirbu/chai-as-typed/master/media/fsm-events-typescript.gif)

However, exposing reliably the type information about a module APIs requires testing. This plugin enhances Chai with specific helpers that make the task of checking the type information in plain JavaScript files easy.
