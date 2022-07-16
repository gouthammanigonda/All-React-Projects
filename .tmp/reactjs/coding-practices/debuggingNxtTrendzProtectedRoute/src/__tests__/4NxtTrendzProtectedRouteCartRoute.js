import {BrowserRouter} from 'react-router-dom'

import {render, screen} from '@testing-library/react'

import Cookies from 'js-cookie'
import App from '../App'

const cartImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-img.png'
const loginRoutePath = '/login'

const cartRouthPath = '/cart'

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

describe(':::RJSCPH1TQT_TEST_SUITE_4:::Cart Route tests', () => {
  it(':::RJSCPH1TQT_TEST_41:::When the "/cart" is provided in the URL by an unauthenticated user then the page should be redirected to LoginRoute and consist of an HTML input element with the label text as "PASSWORD":::5:::', () => {
    mockGetCookie(false)
    renderWithBrowserRouter(<App />, {route: cartRouthPath})
    expect(window.location.pathname).toBe(loginRoutePath)
    expect(screen.getByLabelText(/PASSWORD/i, {exact: false}))
    restoreGetCookieFns()
  })

  it(':::RJSCPH1TQT_TEST_42:::CartRoute should consist of an HTML image element with the given image URL as src and alt text as "cart":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: cartRouthPath})

    const cartImgs = screen.getAllByRole('img', {
      name: /cart/i,
      exact: false,
    })
    expect(cartImgs.some(eachImg => eachImg.src === cartImage)).toBe(true)
    restoreGetCookieFns()
  })
})
