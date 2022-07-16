import path from 'path'

const {expect} = require('@jest/globals')
const fs = require('fs')

const jsxCode = fs.readFileSync(
  path.resolve(__dirname, '../../index.js'),
  'utf8',
)

describe(':::RJSCPJK1TN_TEST_SUITE_1:::Social Buttons tests', () => {
  it(':::RJSCPJK1TN_TEST_1:::JSX code implementation should consist of JSX syntax for HTML main heading element at least once:::10:::', () => {
    expect(
      jsxCode.match(/<\s*h1[^>]*>[^>]*<\/h1>/).length,
    ).toBeGreaterThanOrEqual(1)
  })
  
  it(':::RJSCPJK1TN_TEST_2:::JSX code implementation should consist of JSX syntax <Button /> to render Buttons at least thrice:::10:::', () => {
    expect(jsxCode.match(/<Button[^>]*\/>/g).length).toBeGreaterThanOrEqual(3)
  })
})
