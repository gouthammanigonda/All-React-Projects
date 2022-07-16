import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

describe(':::RJSCPII2BU_TEST_SUITE_1:::Debugging Counter tests', () => {
  it(':::RJSCPII2BU_TEST_1:::Page should initially consist of HTML main heading element with text content as "Count 0":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {name: /Count 0/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPII2BU_TEST_2:::Page should consist of HTML button element with text content as "Increase":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('button', {name: /Increase/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPII2BU_TEST_3:::Page should consist of HTML button element with text content as "Decrease":::5:::', () => {
    render(<App />)
    expect(
      screen.getByRole('button', {name: /Decrease/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPII2BU_TEST_4:::When the Increase button is clicked, then the count should be incremented by one:::5:::', () => {
    render(<App />)
    userEvent.click(
      screen.getByRole('button', {name: /Increase/i, exact: false}),
    )
    expect(
      screen.getByRole('heading', {name: /Count 1/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPII2BU_TEST_5:::When the Decrease button is clicked, then the count should be decremented by one:::5:::', () => {
    render(<App />)
    userEvent.click(
      screen.getByRole('button', {name: /Decrease/i, exact: false}),
    )
    expect(screen.getByRole('heading', {name: /Count -1/i, exact: false}))
  })
})
