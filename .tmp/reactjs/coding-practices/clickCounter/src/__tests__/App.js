import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

describe(':::RJSCPRD0XO_TEST_SUITE_1:::Click Counter tests', () => {
  beforeEach(() => {
    render(<App />)
  })

  it(':::RJSCPRD0XO_TEST_1:::Page should initially consist of HTML heading element with text content as "The Button has been clicked 0 times":::5:::', () => {
    expect(
      screen.getByRole('heading', {
        name: /The Button has been clicked 0 times/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPRD0XO_TEST_2:::Page should consist of HTML paragraph element with text content as "Click the button to increase the count":::5:::', () => {
    expect(
      screen.getByText(/Click the button to increase the count/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPRD0XO_TEST_3:::Page should consist of HTML button element with text content as "Click Me":::5:::', () => {
    expect(
      screen.getByRole('button', {
        name: /Click Me/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPRD0XO_TEST_4:::When the HTML button is clicked the clicks count should be incremented by 1:::5:::', () => {
    userEvent.click(
      screen.getByRole('button', {
        name: /Click Me/i,
        exact: false,
      }),
    )
    expect(
      screen.getByRole('heading', {
        name: /1/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    userEvent.click(
      screen.getByRole('button', {
        name: /Click Me/i,
        exact: false,
      }),
    )
    expect(
      screen.getByRole('heading', {
        name: /2/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })
})
