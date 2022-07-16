import {BrowserRouter} from 'react-router-dom'

import {render, screen} from '@testing-library/react'

import Cookies from 'js-cookie'
import App from '../App'

const loginImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png'

const productsImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-img.png'

const loginRoutePath = '/login'
const productsRoutePath = '/products'

const mockGetCookie = (returnToken = true) => {
  let mockedGetCookie
  if (returnToken) {
    mockedGetCookie = jest.fn(() => ({
      jwt_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwiaWF0IjoxNjE5MDk0MjQxfQ.1i6BbQkQvtvpv72lHPNbl2JOZIB03uRcPbchYYCkL9o',
    }))
  } else {
    mockedGetCookie = jest.fn(() => undefined)
  }
  jest.spyOn(Cookies, 'get')
  Cookies.get = mockedGetCookie
}

const restoreGetCookieFns = () => {
  Cookies.get.mockRestore()
}

const renderWithBrowserRouter = (ui, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

describe(':::RJSCPH1TQT_TEST_SUITE_3:::Products Route tests', () => {
  it(':::RJSCPH1TQT_TEST_39:::When the "/products" is provided in the URL by an unauthenticated user then the page should be redirected to LoginRoute and consists of an HTML image element with the given login image URL as src and alt text as "website login":::5:::', () => {
    mockGetCookie(false)
    renderWithBrowserRouter(<App />, {route: productsRoutePath})
    expect(window.location.pathname).toBe(loginRoutePath)
    const loginImgs = screen.getAllByRole('img', {
      name: /website login/i,
      exact: false,
    })
    expect(loginImgs[0]).toBeInTheDocument()
    expect(loginImgs[0].src).toBe(loginImage)
    restoreGetCookieFns()
  })

  it(':::RJSCPH1TQT_TEST_40:::ProductsRoute should consist of an HTML image element with the given image URL as src and alt text as "products":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: productsRoutePath})

    const productsImgs = screen.getAllByRole('img', {
      name: /products/i,
      exact: false,
    })
    expect(productsImgs.some(eachImg => eachImg.src === productsImage)).toBe(
      true,
    )
    restoreGetCookieFns()
  })
})
