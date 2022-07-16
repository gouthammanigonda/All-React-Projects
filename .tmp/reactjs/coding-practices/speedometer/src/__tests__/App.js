import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

describe(':::RJSCPZS9RB_TEST_SUITE_1:::Speedometer tests', () => {
  beforeEach(() => {
    render(<App />)
  })

  it(':::RJSCPZS9RB_TEST_1:::Page should consist of an HTML heading element with text content as "SPEEDOMETER":::5:::', () => {
    expect(
      screen.getByRole('heading', {name: /speedometer/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPZS9RB_TEST_2:::Page should consist of an HTML image element with alt attribute value as "speedometer":::5:::', () => {
    expect(
      screen.getByRole('img', {name: /speedometer/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPZS9RB_TEST_3:::Page should initially consist of an HTML main heading element with text content as "Speed is 0mph":::5:::', () => {
    expect(
      screen.getByRole('heading', {name: /Speed is 0mph/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPZS9RB_TEST_4:::Page should consist of an HTML paragraph element with text content as "Min Limit is 0mph, Max Limit is 200mph":::5:::', () => {
    const paragrapghEl = screen.getByText(
      /Min Limit is 0mph, Max Limit is 200mph/i,
      {
        exact: false,
      },
    )

    expect(paragrapghEl).toBeInTheDocument()
    expect(paragrapghEl.tagName).toBe('P')
  })

  it(':::RJSCPZS9RB_TEST_5:::Page should consist of an HTML button element with text content as "Accelerate":::5:::', () => {
    expect(
      screen.getByRole('button', {name: /Accelerate/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPZS9RB_TEST_6:::Page should consist of an HTML button element with text content as "Apply Brake":::5:::', () => {
    expect(
      screen.getByRole('button', {name: /Apply Brake/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPZS9RB_TEST_7:::When the "Accelerate" button is clicked, then the speed should be increased by ten:::5:::', () => {
    userEvent.click(
      screen.getByRole('button', {name: /Accelerate/i, exact: false}),
    )
    expect(screen.getByText(/10/i, {exact: false})).toBeInTheDocument()
  })

  it(':::RJSCPZS9RB_TEST_8:::When the "Apply Brake" button is clicked, then the speed should be decreased by ten:::5:::', () => {
    userEvent.click(
      screen.getByRole('button', {name: /Accelerate/i, exact: false}),
    )
    expect(screen.getByText(/10/i, {exact: false})).toBeInTheDocument()
    userEvent.click(
      screen.getByRole('button', {name: /Apply Brake/i, exact: false}),
    )

    expect(
      screen.getAllByText(/0/i, {exact: false}).length,
    ).toBeGreaterThanOrEqual(2)
  })

  it(':::RJSCPZS9RB_TEST_9:::When the "Apply Brake" button is clicked, then the speed should not be decreased below zero:::5:::', () => {
    userEvent.click(
      screen.getByRole('button', {name: /Apply Brake/i, exact: false}),
    )
    expect(
      screen.getAllByText(/0/i, {exact: false}).length,
    ).toBeGreaterThanOrEqual(2)
  })
})
