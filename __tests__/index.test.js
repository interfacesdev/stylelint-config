const fs = require('fs');
const stylelint = require('stylelint');

const config = require('..');

const validCss = fs.readFileSync('./__tests__/css-valid.css', 'utf-8');
const invalidCss = fs.readFileSync('./__tests__/css-invalid.css', 'utf-8');

describe('valid css', () => {
  let result;

  beforeEach(() => {
    result = stylelint.lint({
      code: validCss,
      config,
    });
  });

  it('did not error', () => result.then((data) => expect(data.errored).toBeFalsy()));

  it('flags no warnings', () => result.then((data) => expect(data.results[0].warnings).toHaveLength(0)));
});

describe('invalid css', () => {
  let result;

  beforeEach(() => {
    result = stylelint.lint({
      code: invalidCss,
      config,
    });
  });

  it('did error', () => result.then((data) => expect(data.errored).toBeTruthy()));
});
