import {createMemoryHistory} from 'history'
import {Router, BrowserRouter} from 'react-router-dom'

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Cookies from 'js-cookie'
import App from '../App'

const websiteLogo =
  'https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png'

const homeImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png'

const notFoundPageImage =
  'https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png'

const productsImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-img.png'
const cartImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-img.png'
const loginRoutePath = '/login'
const productsRoutePath = '/products'
const cartRouthPath = '/cart'
const homeRoutePath = '/'
const notFoundRoutePath = '/unknown-path'

let historyInstance
const mockHistoryReplace = instance => {
  jest.spyOn(instance, 'replace')
}

const restoreHistoryReplace = instance => {
  instance.replace.mockRestore()
}

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

const mockRemoveCookie = () => {
  jest.spyOn(Cookies, 'remove')
  Cookies.remove = jest.fn()
}

const restoreRemoveCookieFns = () => {
  Cookies.remove.mockRestore()
}

const rtlRender = (ui = <App />, path = homeRoutePath) => {
  historyInstance = createMemoryHistory()
  historyInstance.push(path)
  render(<Router history={historyInstance}>{ui}</Router>)
  return {
    history: historyInstance,
  }
}

const renderWithBrowserRouter = (
  ui = <App />,
  {route = homeRoutePath} = {},
) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

describe(':::RJSCPPV10E_TEST_SUITE_2:::Home Route tests', () => {
  it(':::RJSCPPV10E_TEST_21:::When the "/" is provided in the browser tab by an unauthenticated user then the page should be redirected to LoginRoute:::5:::', () => {
    mockGetCookie(false)
    renderWithBrowserRouter()

    expect(window.location.pathname).toBe(loginRoutePath)
    restoreGetCookieFns()
  })
  it(':::RJSCPPV10E_TEST_22:::When the "/" is provided in the browser tab by an authenticated user then the HomeRoute should be loaded and consists of an HTML image element with the given home image URL as src and alt text as "clothes that get you noticed":::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const imageEls = screen.getAllByRole('img', {
      name: /clothes that get you noticed/i,
      exact: false,
    })
    expect(imageEls[0]).toBeInTheDocument()
    expect(imageEls[0].src).toBe(homeImage)
    restoreGetCookieFns()
  })
  it(':::RJSCPPV10E_TEST_23:::When the "/products" is provided in the browser tab by an unauthenticated user then the page should be redirected to LoginRoute and consists of an HTML image element with the given login image URL as src and alt text as "website login":::5:::', () => {
    mockGetCookie(false)
    renderWithBrowserRouter(<App />, productsRoutePath)

    expect(window.location.pathname).toBe(loginRoutePath)
    restoreGetCookieFns()
  })
  it(':::RJSCPPV10E_TEST_24:::When the "/cart" is provided in the browser tab by an unauthenticated user then the page should be redirected to LoginRoute:::5:::', () => {
    mockGetCookie(false)
    renderWithBrowserRouter(<App />, cartRouthPath)

    expect(window.location.pathname).toBe(loginRoutePath)
    restoreGetCookieFns()
  })
  it(':::RJSCPPV10E_TEST_25:::When the logout button is clicked then the Cookies.remove() method should be called:::5:::', () => {
    mockRemoveCookie()
    mockGetCookie()
    renderWithBrowserRouter()

    const logoutBtns = screen.getAllByRole('button', {
      name: /logout/i,
      exact: false,
    })

    userEvent.click(logoutBtns[0])
    expect(Cookies.remove).toHaveBeenCalled()
    restoreRemoveCookieFns()
    restoreGetCookieFns()
  })

  it(':::RJSCPPV10E_TEST_26:::When the logout button is clicked then the Cookies.remove() method should be called with the "jwt_token" string as an argument:::5:::', () => {
    mockRemoveCookie()
    mockGetCookie()
    renderWithBrowserRouter()

    const logoutBtns = screen.getAllByRole('button', {
      name: /logout/i,
      exact: false,
    })
    userEvent.click(logoutBtns[0])
    expect(Cookies.remove).toHaveBeenCalledWith('jwt_token')
    restoreRemoveCookieFns()
    restoreGetCookieFns()
  })
  it(':::RJSCPPV10E_TEST_27:::When the logout button is clicked then the history.replace() method should be called:::5:::', () => {
    mockRemoveCookie()
    mockGetCookie()
    const {history} = rtlRender()
    mockHistoryReplace(history)
    const logoutBtns = screen.getAllByRole('button', {
      name: /logout/i,
      exact: false,
    })
    userEvent.click(logoutBtns[0])
    expect(history.replace).toHaveBeenCalled()
    restoreRemoveCookieFns()
    restoreGetCookieFns()
    restoreHistoryReplace(history)
  })
  it(':::RJSCPPV10E_TEST_28:::When the logout button is clicked then the history.replace() method should be called with the argument "/login":::5:::', async () => {
    mockRemoveCookie()
    mockGetCookie()
    const {history} = rtlRender()
    mockHistoryReplace(history)
    const logoutBtns = screen.getAllByRole('button', {
      name: /logout/i,
      exact: false,
    })
    userEvent.click(logoutBtns[0])
    expect(history.replace).toHaveBeenCalledWith(loginRoutePath)
    restoreRemoveCookieFns()
    restoreGetCookieFns()
  })
  it(':::RJSCPPV10E_TEST_29:::When the logout button is clicked then the page should be navigated to LoginRoute:::5:::', async () => {
    mockGetCookie()
    mockRemoveCookie()
    renderWithBrowserRouter()
    restoreGetCookieFns()

    const logoutBtns = screen.getAllByRole('button', {
      name: /logout/i,
      exact: false,
    })
    userEvent.click(logoutBtns[0])
    restoreRemoveCookieFns()

    expect(window.location.pathname).toBe(loginRoutePath)
  })
  it(':::RJSCPPV10E_TEST_30:::When the Products link is clicked then the page should be navigated to ProductsRoute:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const productsBtns = screen.getAllByRole('link', {
      name: /products/i,
      exact: false,
    })
    userEvent.click(productsBtns[0])

    expect(window.location.pathname).toBe(productsRoutePath)

    restoreGetCookieFns()
  })
  it(':::RJSCPPV10E_TEST_31:::ProductsRoute should consist of an HTML image element with the given image URL as src and alt text as "products":::5:::', async () => {
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
  it(':::RJSCPPV10E_TEST_32:::When the Cart link is clicked then the page should be navigated to CartRoute:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const cartBtns = screen.getAllByRole('link', {
      name: /cart/i,
      exact: false,
    })
    userEvent.click(cartBtns[0])
    expect(window.location.pathname).toBe(cartRouthPath)
    restoreGetCookieFns()
  })
  it(':::RJSCPPV10E_TEST_33:::CartRoute should consist of an HTML image element with the given image URL as src and alt text as "cart":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: cartRouthPath})

    const cartImgs = screen.getAllByRole('img', {
      name: /cart/i,
      exact: false,
    })
    expect(cartImgs.some(eachImg => eachImg.src === cartImage)).toBe(true)
    restoreGetCookieFns()
  })
  it(':::RJSCPPV10E_TEST_34:::HomeRoute should consist of an HTML image element with the given image URL as src and alt text as "clothes that get you noticed":::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter()
    const imageEls = screen.getAllByRole('img', {
      name: /clothes that get you noticed/i,
      exact: false,
    })
    expect(imageEls[0]).toBeInTheDocument()
    expect(imageEls[0].src).toBe(homeImage)
    restoreGetCookieFns()
  })
  it(':::RJSCPPV10E_TEST_35:::HomeRoute should consist of an HTML image element with the given logo URL as src and alt text as "website logo":::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter()
    const imageEls = screen.getAllByRole('img', {
      name: /website logo/i,
      exact: false,
    })
    expect(imageEls[0]).toBeInTheDocument()
    expect(imageEls[0].src).toBe(websiteLogo)
    restoreGetCookieFns()
  })

  it(':::RJSCPPV10E_TEST_36:::HomeRoute should consist of a Link from react-router-dom in the header with "Home" as text content:::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter()
    expect(
      screen.getAllByRole('link', {
        name: /Home/i,
        exact: false,
      })[0],
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPPV10E_TEST_37:::HomeRoute should consist of a Link from react-router-dom in the header with "Products" as text content:::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter()
    expect(
      screen.getAllByRole('link', {
        name: /Products/i,
        exact: false,
      })[0],
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPPV10E_TEST_38:::HomeRoute should consist of a Link from react-router-dom in the header with "Cart" as text content:::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter()
    expect(
      screen.getAllByRole('link', {
        name: /Cart/i,
        exact: false,
      })[0],
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPPV10E_TEST_39:::HomeRoute should consist of an HTML paragraph element with text content starting with "Fashion is part of the daily air":::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter()
    const paragraphEl = screen.getByText(/Fashion is part of the daily air/i, {
      exact: false,
    })
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCPPV10E_TEST_40:::HomeRoute should consist of an HTML button element with "Shop Now" as text content:::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter()
    expect(
      screen.getByRole('button', {
        name: /Shop Now/,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPPV10E_TEST_41:::When the "/bad-path" is provided in the browser tab then the page should be navigated to NotFoundRoute and consists of an HTML image element with the given not found image URL as src and alt text as "not found":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: notFoundRoutePath})
    const imageEl = screen.getByRole('img', {name: /not found/i, exact: false})
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(notFoundPageImage)
    expect(window.location.pathname).toBe(notFoundRoutePath)
    restoreGetCookieFns()
  })
})
