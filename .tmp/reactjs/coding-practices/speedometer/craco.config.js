module.exports = {
  jest: {
    configure: {
      moduleFileExtensions: ['js', 'jsx', 'mjs'],
      reporters: [
        [
          'ccbp-jest-reporter',
          {
            resultDir: '.results',
            resultHtml: 'results.html',
            resultJson: 'results.json',
          },
        ],
      ],
    },
  },
}
