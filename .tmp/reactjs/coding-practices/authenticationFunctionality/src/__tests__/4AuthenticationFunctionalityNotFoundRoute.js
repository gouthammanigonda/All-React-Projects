import {BrowserRouter} from 'react-router-dom'

import {render, screen} from '@testing-library/react'

import App from '../App'

const notFoundRoutePath = '/bad-path'

const renderWithBrowserRouter = (ui, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

describe(':::RJSCPFGWRF_TEST_SUITE_4:::Not Found Route tests', () => {
  it(':::RJSCPFGWRF_TEST_26:::When the "/bad-path" is provided in the browser tab then the page should be navigated to NotFoundRoute and consist of an HTML heading element with "Not Found" as text content:::5:::', async () => {
    renderWithBrowserRouter(<App />, {route: notFoundRoutePath})
    expect(window.location.pathname).toBe(notFoundRoutePath)
    expect(
      screen.getByRole('heading', {name: /Not Found/i, exact: false}),
    ).toBeInTheDocument()
  })
})
