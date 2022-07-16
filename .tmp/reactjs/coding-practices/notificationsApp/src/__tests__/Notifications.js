import path from 'path'

const {expect} = require('@jest/globals')
const fs = require('fs')

const jsxCode = fs.readFileSync(
  path.resolve(__dirname, '../../index.js'),
  'utf8',
)

describe(':::RJSCPNTA3P_TEST_SUITE_1:::Notifications tests', () => {
  it(':::RJSCPNTA3P_TEST_1:::JSX code implementation should consist of JSX syntax for HTML main heading element at least once:::5:::', () => {
    expect(
      jsxCode.match(/<\s*h1[^>]*>[^>]*<\/h1>/).length,
    ).toBeGreaterThanOrEqual(1)
  })

  it(':::RJSCPNTA3P_TEST_2:::JSX code implementation should consist of JSX syntax for HTML paragraph element at least once:::5:::', () => {
    expect(
      jsxCode.match(/<\s*p[^>]*>[^>]*<\/p>/).length,
    ).toBeGreaterThanOrEqual(1)
  })

  it(':::RJSCPNTA3P_TEST_3:::JSX code implementation should consist of JSX syntax for HTML image element at least once:::5:::', () => {
    const imageRegex = /<\s*img[^>]*\/>/
    expect(jsxCode.match(imageRegex).length).toBeGreaterThanOrEqual(1)
  })
  
  it(':::RJSCPNTA3P_TEST_4:::JSX code implementation should consist of JSX syntax <Notification /> to render Notifications at least four times:::5:::', () => {
    expect(
      jsxCode.match(/<Notification[^>]*\/>/g).length,
    ).toBeGreaterThanOrEqual(4)
  })
})
