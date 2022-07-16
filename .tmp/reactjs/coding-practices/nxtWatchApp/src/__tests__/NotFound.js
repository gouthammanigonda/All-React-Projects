import {BrowserRouter} from 'react-router-dom'

import {render, screen} from '@testing-library/react'

import App from '../App'

const notFoundPageImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

const notFoundRoutePath = '/bad-path'

const renderWithBrowserRouter = (ui, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

describe(':::RJSCPYQN94_TEST_SUITE_8:::Not Found Route tests', () => {
  it(':::RJSCPYQN94_TEST_133:::When the "/bad-path" is provided as the URL in the browser tab, then the page should be navigated to NotFound Route and consist of an HTML image element with alt text as "not found" and src as the given "Not Found Image" URL:::5:::', () => {
    renderWithBrowserRouter(<App />, {route: notFoundRoutePath})
    const imageEl = screen.getByRole('img', {name: /not found/i, exact: false})
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(notFoundPageImage)
  })

  it(':::RJSCPYQN94_TEST_134:::When the "/bad-path" is provided as the URL in the browser tab, then the page should be navigated to NotFound Route and consist of the HTML main heading element with text content as "Page Not Found":::5:::', () => {
    renderWithBrowserRouter(<App />, {route: notFoundRoutePath})
    expect(
      screen.getByRole('heading', {
        name: /Page Not Found/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPYQN94_TEST_135:::When the "/bad-path" is provided as the URL in the browser tab, then the page should be navigated to NotFound Route and consist of the HTML paragraph element with text content as "we are sorry, the page you requested could not be found.":::5:::', () => {
    renderWithBrowserRouter(<App />, {route: notFoundRoutePath})
    const paragraphEl = screen.getByText(
      /we are sorry, the page you requested could not be found./i,
      {
        exact: false,
      },
    )
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })
})
