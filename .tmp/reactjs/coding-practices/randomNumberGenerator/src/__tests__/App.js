import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

describe(':::RJSCPWGO67_TEST_SUITE_1:::Random Number Generator tests', () => {
  let mockRandom
  beforeEach(() => {
    mockRandom = jest.spyOn(global.Math, 'random').mockReturnValue(0.11)
    render(<App />)
  })

  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it(':::RJSCPWGO67_TEST_1:::Page should consist of HTML main heading element with text content as "Random Number":::5:::', () => {
    expect(
      screen.getByRole('heading', {name: /Random Number/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPWGO67_TEST_2:::Page should consist of HTML paragraph element with text content as "Generate a random number in the range of 0 to 100":::5:::', () => {
    const paragraphEl = screen.getByText(
      /Generate a random number in the range of 0 to 100/i,
      {
        exact: false,
      },
    )

    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCPWGO67_TEST_3:::Page should consist of HTML button element with text content as "Generate":::5:::', () => {
    expect(
      screen.getByRole('button', {name: /Generate/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPWGO67_TEST_4:::Page should initially consist of HTML paragraph element with text content as "0":::5:::', () => {
    const paragraphEl = screen.getByText(/^0/, {exact: false})

    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCPWGO67_TEST_5:::When Generate button is clicked, Math.random() should be used to generate a random number:::5:::', () => {
    userEvent.click(
      screen.getByRole('button', {name: /Generate/i, exact: false}),
    )
    expect(mockRandom).toHaveBeenCalled()
  })

  it(':::RJSCPWGO67_TEST_6:::When Generate button is clicked, a random number should be generated between zero to hundred and displayed:::5:::', () => {
    userEvent.click(
      screen.getByRole('button', {name: /Generate/i, exact: false}),
    )
    expect(screen.getByText(/11/, {exact: false})).toBeInTheDocument()
  })
})
