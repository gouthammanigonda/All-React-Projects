import {createMemoryHistory} from 'history'
import {Router, BrowserRouter} from 'react-router-dom'
import {rest} from 'msw'
import {setupServer} from 'msw/node'

import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Cookies from 'js-cookie'
import App from '../App'

const websiteLogin =
  'https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png'

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

const productsResponse = {
  products: [
    {
      title: 'Front Load Machine',
      brand: 'Samsung',
      price: 22490,
      id: 24,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/appliances-washing-machine.png',
      rating: 4.5,
    },
    {
      title: "Collider Black Dial Men's Watch",
      brand: 'Fossil',
      price: 14995,
      id: 33,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-simple-belt-watch.png',
      rating: 4.3,
    },
    {
      title: 'True Wireless Earbuds',
      brand: 'LG',
      price: 13499,
      id: 18,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/appliances-ear-buds.png',
      rating: 4.4,
    },
    {
      title: "Maritime Men's Watch",
      brand: 'Titan',
      price: 11999,
      id: 35,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-tatar-watch.png',
      rating: 4.3,
    },
    {
      title: "Neutra Analog Men's Watch",
      brand: 'Fossil',
      price: 10995,
      id: 34,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-simple-watch.png',
      rating: 4.1,
    },
    {
      title: 'Monsters Charm Toy',
      brand: 'Trendytap',
      price: 8600,
      id: 48,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/toys-minnos.png',
      rating: 4.2,
    },
    {
      title: 'Privateer Quartz Watch',
      brand: 'Fossil',
      price: 8122,
      id: 31,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-royal-black-watch.png',
      rating: 4.4,
    },
    {
      title: 'Podcast Microphone',
      brand: 'MAONO',
      price: 5555,
      id: 22,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/appliances-singing-mike.png',
      rating: 4.4,
    },
    {
      title: 'Virgin Avocado Oil',
      brand: 'ProV',
      price: 4144,
      id: 42,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/grocery-oil.png',
      rating: 4.4,
    },
    {
      title: 'Warm Up Jacket',
      brand: 'Monte Carlo',
      price: 2796,
      id: 11,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-sim-jacket.png',
      rating: 4.4,
    },
  ],
}

const primeDealsResponse = {
  prime_deals: [
    {
      id: 1001,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/appliances-silver-hair-dryer.png',
      title: 'Hair Dryer',
      style: 'Philips HP8100/46 Hair Dryer - Salon Dry Compact',
      price: 760,
      description: 'Advanced concentrator technology with quick-heat head. ',
      brand: 'Phillips',
      total_reviews: 5463,
      rating: 3.9,
      availability: 'In Stock',
    },
    {
      id: 1002,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/toys-people-toys.png',
      title: 'Minifigures',
      style: 'Minifigures',
      price: 760,
      description:
        'Collect all mystery minifigures in the new series 11 and grow your LEGO Minifigure Collection. ',
      brand: 'LEGO',
      total_reviews: 5463,
      rating: 3.9,
      availability: 'In Stock',
    },
    {
      id: 1003,
      image_url:
        'https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-short-tri-pod.png',
      title: 'Lightweight Tripod',
      style: 'Lightweight Tripod',
      price: 760,
      description:
        'Adjustable-height tripod made of lightweight aluminum, Recommended max load weight is 2 Kg for optimal performance. ',
      brand: 'LEGO',
      total_reviews: 5463,
      rating: 3.9,
      availability: 'In Stock',
    },
  ],
}

const productsApiUrl = 'https://apis.ccbp.in/products'
const primeDealsApiUrl = 'https://apis.ccbp.in/prime-deals'

const handlers = [
  rest.get(primeDealsApiUrl, (req, res, ctx) =>
    res(ctx.json(primeDealsResponse)),
  ),
  rest.get(productsApiUrl, (req, res, ctx) => res(ctx.json(productsResponse))),
]

const server = setupServer(...handlers)

describe(':::RJSCPHSVU2_TEST_SUITE_3:::Home Route tests', () => {
  beforeAll(() => {
    server.listen()
  })

  afterAll(() => {
    server.close()
  })

  afterEach(() => {
    server.resetHandlers()
  })

  it(':::RJSCPHSVU2_TEST_17:::When "/" is provided in the URL by an unauthenticated user, then the page should be navigated to Login Route and consists of an HTML image element with alt attribute value as "website login" and src as given login image url:::5:::', () => {
    mockGetCookie(false)
    renderWithBrowserRouter(<App />, {route: homeRoutePath})
    expect(window.location.pathname).toBe(loginRoutePath)
    const loginImgs = screen.getAllByRole('img', {
      name: /website login/i,
      exact: false,
    })
    expect(loginImgs[0]).toBeInTheDocument()
    expect(loginImgs[0].src).toBe(websiteLogin)
    restoreGetCookieFns()
  })

  it(':::RJSCPHSVU2_TEST_18:::When "/" is provided in the URL by an authenticated user, then the page should be navigated to Home Route and consists of an HTML image element with alt as "clothes that get you noticed" and src as given home image URL:::5:::', () => {
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

  it(':::RJSCPHSVU2_TEST_19:::When the Products link is clicked then the page should be navigated to Products Route and consist of an HTML main heading element with text content as "Category":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: homeRoutePath})
    const productsBtns = screen.getAllByRole('link', {
      name: /products/i,
      exact: false,
    })
    userEvent.click(productsBtns[0])

    expect(
      await screen.findByText(productsResponse.products[0].title, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(
      await screen.findByRole('heading', {name: /Hair Dryer/i, exact: false}),
    ).toBeInTheDocument()

    expect(window.location.pathname).toBe(productsRoutePath)
    expect(screen.getByText('Category')).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPHSVU2_TEST_20:::When the Cart link is clicked, then the page should be navigated to Cart Route and consist of an HTML image element with alt as "cart" and src as given cart image URL:::5:::', async () => {
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

  it(':::RJSCPHSVU2_TEST_21:::When the logout button is clicked, then the Cookies.remove() method should be called with the argument as "jwt_token":::5:::', () => {
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

  it(':::RJSCPHSVU2_TEST_22:::When the logout button is clicked then the history.replace() method should be called with the argument "/login":::5:::', async () => {
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

  it(':::RJSCPHSVU2_TEST_23:::When the logout button is clicked then the page should be navigated to LoginRoute and consists of an HTML image element with alt attribute value as "website login" and src as given login image url:::5:::', async () => {
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
    const loginImgs = screen.getAllByRole('img', {
      name: /website login/i,
      exact: false,
    })
    expect(loginImgs[0]).toBeInTheDocument()
    expect(loginImgs[0].src).toBe(websiteLogin)
    restoreGetCookieFns()
  })
})
