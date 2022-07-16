import {createMemoryHistory} from 'history'
import {Router, BrowserRouter} from 'react-router-dom'

import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Cookies from 'js-cookie'
import App from '../App'

const websiteLogo =
  'https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png'

const homeImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png'

const productsImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-img.png'
const cartImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-img.png'
const loginRoutePath = '/login'
const productsRoutePath = '/products'
const homeRoutePath = '/'

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

const rtlRender = (ui = <App />, path = '/') => {
  historyInstance = createMemoryHistory()
  historyInstance.push(path)
  render(<Router history={historyInstance}>{ui}</Router>)
  return {
    history: historyInstance,
  }
}

const renderWithBrowserRouter = (ui, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

describe(':::RJSCPH1TQT_TEST_SUITE_2:::Home Route tests', () => {
  it(':::RJSCPH1TQT_TEST_22:::When the "/" is provided in the URL by an unauthenticated user then the page should be redirected to LoginRoute and consist is an HTML input element with label text as "USERNAME":::5:::', () => {
    mockGetCookie(false)
    renderWithBrowserRouter(<App />, {route: homeRoutePath})

    expect(window.location.pathname).toBe(loginRoutePath)
    expect(screen.getByLabelText(/USERNAME/i, {exact: false}))
    restoreGetCookieFns()
  })
  it(':::RJSCPH1TQT_TEST_23:::When the "/" is provided in the URL by an authenticated user then the HomeRoute should be loaded and consists of an HTML image element with the given home image URL as src and alt text as "clothes that get you noticed":::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: homeRoutePath})

    const imageEls = screen.getAllByRole('img', {
      name: /clothes that get you noticed/i,
      exact: false,
    })
    expect(imageEls[0]).toBeInTheDocument()
    expect(imageEls[0].src).toBe(homeImage)
    restoreGetCookieFns()
  })

  it(':::RJSCPH1TQT_TEST_24:::HomeRoute should consist of an HTML image element with the given image URL as src and alt text as "clothes that get you noticed":::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: homeRoutePath})
    const imageEls = screen.getAllByRole('img', {
      name: /clothes that get you noticed/i,
      exact: false,
    })
    expect(imageEls[0]).toBeInTheDocument()
    expect(imageEls[0].src).toBe(homeImage)
    restoreGetCookieFns()
  })
  it(':::RJSCPH1TQT_TEST_25:::HomeRoute should consist of an HTML image element with the given logo URL as src and alt text as "website logo":::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: homeRoutePath})
    const imageEls = screen.getAllByRole('img', {
      name: /website logo/i,
      exact: false,
    })
    expect(imageEls[0]).toBeInTheDocument()
    expect(imageEls[0].src).toBe(websiteLogo)
    restoreGetCookieFns()
  })

  it(':::RJSCPH1TQT_TEST_26:::HomeRoute should consist of a Link from react-router-dom in the header with "Home" as text content:::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: homeRoutePath})
    expect(
      screen.getAllByRole('link', {
        name: /Home/i,
        exact: false,
      })[0],
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPH1TQT_TEST_27:::HomeRoute should consist of a Link from react-router-dom in the header with "Products" as text content:::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: homeRoutePath})
    expect(
      screen.getAllByRole('link', {
        name: /Products/i,
        exact: false,
      })[0],
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPH1TQT_TEST_28:::HomeRoute should consist of a Link from react-router-dom in the header with "Cart" as text content:::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: homeRoutePath})
    expect(
      screen.getAllByRole('link', {
        name: /Cart/i,
        exact: false,
      })[0],
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })
  it(':::RJSCPH1TQT_TEST_29:::HomeRoute should consist of an HTML heading element with "Clothes That Get YOU Noticed" as text content:::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: homeRoutePath})
    expect(
      screen.getByRole('heading', {
        name: /Clothes That Get YOU Noticed/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPH1TQT_TEST_30:::HomeRoute should consist of an HTML paragraph element with text content starting with "Fashion is part of the daily air":::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: homeRoutePath})
    const paragraphEl = screen.getByText(/Fashion is part of the daily air/i, {
      exact: false,
    })
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCPH1TQT_TEST_31:::HomeRoute should consist of an HTML button element with "Shop Now" as text content:::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: homeRoutePath})
    expect(
      screen.getByRole('button', {
        name: /Shop Now/,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPH1TQT_TEST_32:::When the Products link is clicked then the page should be navigated to ProductsRoute and consist of an HTML image element with the given image URL as src and alt text as "products":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: homeRoutePath})

    const productsBtns = screen.getAllByRole('link', {
      name: /products/i,
      exact: false,
    })
    userEvent.click(productsBtns[0])
    await waitFor(() =>
      expect(window.location.pathname).toBe(productsRoutePath),
    )
    const productsImgs = screen.getAllByRole('img', {
      name: 'products',
      exact: false,
    })
    expect(productsImgs.some(eachImg => eachImg.src === productsImage)).toBe(
      true,
    )
    restoreGetCookieFns()
  })

  it(':::RJSCPH1TQT_TEST_33:::When the Cart link is clicked then the page should be navigated to CartRoute and consist of an HTML image element with the given image URL as src and alt text as "cart":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: homeRoutePath})

    const cartBtns = screen.getAllByRole('link', {
      name: /cart/i,
      exact: false,
    })
    userEvent.click(cartBtns[0])
    await waitFor(() => expect(window.location.pathname).toBe('/cart'))
    const cartImgs = screen.getAllByRole('img', {
      name: 'cart',
      exact: false,
    })
    expect(cartImgs.some(eachImg => eachImg.src === cartImage)).toBe(true)
    restoreGetCookieFns()
  })

  it(':::RJSCPH1TQT_TEST_34:::When the logout button is clicked then the Cookies.remove() method should be called:::5:::', () => {
    mockRemoveCookie()
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: homeRoutePath})

    const logoutBtns = screen.getAllByRole('button', {
      name: /logout/i,
      exact: false,
    })

    userEvent.click(logoutBtns[1])
    expect(Cookies.remove).toHaveBeenCalled()
    restoreRemoveCookieFns()
    restoreGetCookieFns()
  })

  it(':::RJSCPH1TQT_TEST_35:::When the logout button is clicked then the Cookies.remove() method should be called with the argument as "jwt_token":::5:::', () => {
    mockRemoveCookie()
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: homeRoutePath})

    const logoutBtns = screen.getAllByRole('button', {
      name: /logout/i,
      exact: false,
    })
    userEvent.click(logoutBtns[1])
    expect(Cookies.remove).toHaveBeenCalledWith('jwt_token')
    restoreRemoveCookieFns()
    restoreGetCookieFns()
  })
  it(':::RJSCPH1TQT_TEST_36:::When the logout button is clicked then the history.replace() method should be called:::5:::', () => {
    mockRemoveCookie()
    mockGetCookie()
    const {history} = rtlRender(<App />, homeRoutePath)
    mockHistoryReplace(history)
    const logoutBtns = screen.getAllByRole('button', {
      name: /logout/i,
      exact: false,
    })
    userEvent.click(logoutBtns[1])
    expect(history.replace).toHaveBeenCalled()
    restoreRemoveCookieFns()
    restoreGetCookieFns()
    restoreHistoryReplace(history)
  })
  it(':::RJSCPH1TQT_TEST_37:::When the logout button is clicked then the history.replace() method should be called with the argument "/login":::5:::', async () => {
    mockRemoveCookie()
    mockGetCookie()
    const {history} = rtlRender(<App />, homeRoutePath)
    mockHistoryReplace(history)
    const logoutBtns = screen.getAllByRole('button', {
      name: /logout/i,
      exact: false,
    })
    userEvent.click(logoutBtns[1])
    expect(history.replace).toHaveBeenCalledWith(loginRoutePath)
    restoreRemoveCookieFns()
    restoreGetCookieFns()
  })
  it(':::RJSCPH1TQT_TEST_38:::When the logout button is clicked then the page should be navigated to LoginRoute and consist of an HTML button element with "Login" as text content:::5:::', async () => {
    mockGetCookie()
    mockRemoveCookie()
    renderWithBrowserRouter(<App />, {route: homeRoutePath})
    const logoutBtns = screen.getAllByRole('button', {
      name: /logout/i,
      exact: false,
    })
    restoreGetCookieFns()
    mockGetCookie(false)
    userEvent.click(logoutBtns[1])
    await waitFor(() => expect(window.location.pathname).toBe(loginRoutePath))
    expect(screen.getByRole('button', {name: /Login/i, exact: false}))
    restoreRemoveCookieFns()
  })
})
