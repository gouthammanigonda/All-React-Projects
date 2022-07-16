import path from 'path'

const {expect} = require('@jest/globals')
const fs = require('fs')

const jsxCode = fs.readFileSync(
  path.resolve(__dirname, '../../index.js'),
  'utf8',
)

describe(':::RJSCPHB1SE_TEST_SUITE_1:::Boxes tests', () => {
  it(':::RJSCPHB1SE_TEST_1:::JSX code implementation should consist of JSX syntax for HTML main heading element at least once:::5:::', () => {
    expect(
      jsxCode.match(/<\s*h1[^>]*>[^>]*<\/h1>/).length,
    ).toBeGreaterThanOrEqual(1)
  })

  it(':::RJSCPHB1SE_TEST_2:::JSX code implementation should consist of JSX syntax <Box /> to render Boxes at least thrice:::5:::', () => {
    expect(jsxCode.match(/<Box[^>]*\/>/g).length).toBeGreaterThanOrEqual(3)
  })
})
