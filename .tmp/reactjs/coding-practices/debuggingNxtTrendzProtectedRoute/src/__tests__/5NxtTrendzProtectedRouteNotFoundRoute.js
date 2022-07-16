import {BrowserRouter} from 'react-router-dom'

import {render, screen} from '@testing-library/react'

import App from '../App'

const notFoundPageImage =
  'https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png'

const notFoundRoutePath = '/bad-path'

const renderWithBrowserRouter = (ui, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

describe(':::RJSCPH1TQT_TEST_SUITE_5:::Not Found Route tests', () => {
  it(':::RJSCPH1TQT_TEST_43:::When the "/bad-path" is provided in the URL then the page should be navigated to NotFoundRoute and consist of an HTML image element with the given not found image URL as src and alt text as "not found":::5:::', async () => {
    renderWithBrowserRouter(<App />, {route: notFoundRoutePath})

    const imageEl = screen.getByRole('img', {name: /not found/i, exact: false})
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(notFoundPageImage)
    expect(window.location.pathname).toBe(notFoundRoutePath)
  })
})
