import {BrowserRouter} from 'react-router-dom'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, screen, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Cookies from 'js-cookie'

import App from '../App'

const loginImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png'

const loginRoutePath = '/login'
const productsRoutePath = '/products'

const mockGetCookie = (returnToken = true) => {
  let mockedGetCookie
  if (returnToken) {
    mockedGetCookie = jest.fn(() => ({
      jwt_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhamEiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTYxOTY5MTMwN30.T--R95wvSdSpRlHWeKGbP3yTSq2wk196PqpqUamuM_g',
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

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

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

const originalFetch = window.fetch

describe(':::RJSCPHSVU2_TEST_SUITE_1:::Products Route tests', () => {
  beforeAll(() => {
    server.listen()
  })

  afterAll(() => {
    server.close()
  })

  afterEach(() => {
    server.resetHandlers()
    window.fetch = originalFetch
  })

  it(':::RJSCPHSVU2_TEST_1:::When "/products" is provided as the URL by an unauthenticated user, then the page should be navigated to Login Route and consists of an HTML image element with alt attribute value as "website login" and src as given login image url:::5:::', async () => {
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

  it(':::RJSCPHSVU2_TEST_2:::Products Route should consist of an HTML input element with type attribute value as "search":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: productsRoutePath})

    expect(
      await screen.findByText(productsResponse.products[0].title, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(
      await screen.findByRole('heading', {name: /Hair Dryer/i, exact: false}),
    ).toBeInTheDocument()

    const searchEls = screen.getByRole('searchbox')

    expect(searchEls).toBeInTheDocument()
    expect(searchEls.type).toBe('search')

    restoreGetCookieFns()
  })

  it(':::RJSCPHSVU2_TEST_3:::Products Route should consist of an HTML main heading element with text content as "Category":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: productsRoutePath})

    expect(
      await screen.findByText(productsResponse.products[0].title, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(
      await screen.findByRole('heading', {name: /Hair Dryer/i, exact: false}),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', {name: /Category/i, exact: false}),
    ).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPHSVU2_TEST_4:::Products Route should consist of HTML paragraph elements with text content as the values of the key "name" in each item from the categoryOptions provided:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: productsRoutePath})

    expect(
      await screen.findByText(productsResponse.products[0].title, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(
      await screen.findByRole('heading', {name: /Hair Dryer/i, exact: false}),
    ).toBeInTheDocument()

    expect(
      screen.getByText(categoryOptions[0].name, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(categoryOptions[0].name, {exact: false}).tagName,
    ).toBe('P')
    expect(
      screen.getByText(categoryOptions[1].name, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(categoryOptions[0].name, {exact: false}).tagName,
    ).toBe('P')
    expect(
      screen.getByText(categoryOptions[2].name, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(categoryOptions[0].name, {exact: false}).tagName,
    ).toBe('P')
    expect(
      screen.getByText(categoryOptions[3].name, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(categoryOptions[0].name, {exact: false}).tagName,
    ).toBe('P')
    expect(
      screen.getByText(categoryOptions[4].name, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(categoryOptions[0].name, {exact: false}).tagName,
    ).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCPHSVU2_TEST_5:::Products Route should consist of HTML image elements with alt attribute value as "rating {ratingId}" and src as the value of key "imageUrl" of each item in ratingsList provided:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: productsRoutePath})
    expect(
      await screen.findByText(productsResponse.products[0].title, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(
      await screen.findByRole('heading', {name: /Hair Dryer/i, exact: false}),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('img', {name: /rating 1/, exact: false}),
    ).toBeInTheDocument()
    expect(screen.getByRole('img', {name: /rating 1/, exact: false}).src).toBe(
      ratingsList[3].imageUrl,
    )
    expect(
      screen.getByRole('img', {name: /rating 2/, exact: false}),
    ).toBeInTheDocument()
    expect(screen.getByRole('img', {name: /rating 2/, exact: false}).src).toBe(
      ratingsList[2].imageUrl,
    )
    expect(
      screen.getByRole('img', {name: /rating 3/, exact: false}),
    ).toBeInTheDocument()
    expect(screen.getByRole('img', {name: /rating 3/, exact: false}).src).toBe(
      ratingsList[1].imageUrl,
    )
    expect(
      screen.getByRole('img', {name: /rating 4/, exact: false}),
    ).toBeInTheDocument()
    expect(screen.getByRole('img', {name: /rating 4/, exact: false}).src).toBe(
      ratingsList[0].imageUrl,
    )
    restoreGetCookieFns()
  })

  it(':::RJSCPHSVU2_TEST_6:::Products Route should consist of HTML button element with text content as "Clear Filters":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: productsRoutePath})
    expect(
      await screen.findByText(productsResponse.products[0].title, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(
      await screen.findByRole('heading', {name: /Hair Dryer/i, exact: false}),
    ).toBeInTheDocument()

    expect(screen.getByRole('button', {name: /Clear Filters/i}))
    restoreGetCookieFns()
  })

  it(':::RJSCPHSVU2_TEST_7:::When Products Route is opened, an HTTP GET request should be made to productsApiUrl with query parameters "title_search", "category", and "rating" with initial values as empty strings:::5:::', async () => {
    mockGetCookie()
    const mockFetchFunction = jest.fn().mockImplementation(url => {
      if (url === 'https://apis.ccbp.in/prime-deals') {
        return {
          ok: true,
          json: () => Promise.resolve(primeDealsResponse),
        }
      }
      return {
        ok: true,
        json: () => Promise.resolve(productsResponse),
      }
    })
    window.fetch = mockFetchFunction
    renderWithBrowserRouter(<App />, {route: productsRoutePath})

    expect(
      await screen.findByText(productsResponse.products[0].title, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(
      await screen.findByRole('heading', {name: /Hair Dryer/i, exact: false}),
    ).toBeInTheDocument()

    const productsApiMockCall = mockFetchFunction.mock.calls.find(eachCall =>
      eachCall[0].match(productsApiUrl),
    )
    expect(productsApiMockCall[0]).toMatch('title_search=')
    expect(productsApiMockCall[0]).toMatch('rating=')
    expect(productsApiMockCall[0]).toMatch('category=')
    restoreGetCookieFns()
  })

  it(':::RJSCPHSVU2_TEST_8:::When the HTTP GET request in the Products Route is successful, then the page should consist of the HTML main heading elements with text content as the value of the key "title" in each item from the productsResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />, {route: productsRoutePath})
    expect(
      await screen.findByText(productsResponse.products[0].title, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(
      await screen.findByRole('heading', {name: /Hair Dryer/i, exact: false}),
    ).toBeInTheDocument()

    expect(
      screen.getByText(productsResponse.products[1].title),
    ).toBeInTheDocument()
    expect(
      screen.getByText(productsResponse.products[2].title),
    ).toBeInTheDocument()
    expect(
      screen.getByText(productsResponse.products[3].title),
    ).toBeInTheDocument()
    expect(
      screen.getByText(productsResponse.products[4].title),
    ).toBeInTheDocument()
    expect(
      screen.getByText(productsResponse.products[5].title),
    ).toBeInTheDocument()
    expect(
      screen.getByText(productsResponse.products[6].title),
    ).toBeInTheDocument()
    expect(
      screen.getByText(productsResponse.products[7].title),
    ).toBeInTheDocument()
    expect(
      screen.getByText(productsResponse.products[8].title),
    ).toBeInTheDocument()
    expect(
      screen.getByText(productsResponse.products[9].title),
    ).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPHSVU2_TEST_9:::When a non-empty value is provided in an HTML input element for search and the Enter key is pressed, an HTTP GET request should be made with the value provided in the HTML input element as the value to query parameter "title_search":::5:::', async () => {
    mockGetCookie()
    const mockFetchFunction = jest.fn().mockImplementation(url => {
      if (url === 'https://apis.ccbp.in/prime-deals') {
        return {
          ok: true,
          json: () => Promise.resolve(primeDealsResponse),
        }
      }
      return {
        ok: true,
        json: () => Promise.resolve(productsResponse),
      }
    })
    window.fetch = mockFetchFunction
    renderWithBrowserRouter(<App />, {route: productsRoutePath})

    expect(
      await screen.findByText(productsResponse.products[0].title, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(
      await screen.findByRole('heading', {name: /Hair Dryer/i, exact: false}),
    ).toBeInTheDocument()

    userEvent.type(screen.getByRole('searchbox'), 'machine')
    fireEvent.keyDown(screen.getByRole('searchbox'), {
      key: 'Enter',
      keyCode: 13,
      which: 13,
    })

    expect(mockFetchFunction.mock.calls[2][0]).toMatch('title_search=machine')

    expect(
      await screen.findByText(productsResponse.products[0].title, {
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPHSVU2_TEST_10:::When a category is clicked, an HTTP GET request should be made with the id of the category as the value to query parameter "category":::5:::', async () => {
    mockGetCookie()
    const mockFetchFunction = jest.fn().mockImplementation(url => {
      if (url === 'https://apis.ccbp.in/prime-deals') {
        return {
          ok: true,
          json: () => Promise.resolve(primeDealsResponse),
        }
      }
      return {
        ok: true,
        json: () => Promise.resolve(productsResponse),
      }
    })
    window.fetch = mockFetchFunction
    renderWithBrowserRouter(<App />, {route: productsRoutePath})

    expect(
      await screen.findByText(productsResponse.products[0].title, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(
      await screen.findByRole('heading', {name: /Hair Dryer/i, exact: false}),
    ).toBeInTheDocument()

    userEvent.click(screen.getByText(/Grocery/i, {exact: false}))

    expect(mockFetchFunction.mock.calls[2][0]).toMatch('category=4')
    expect(
      await screen.findByText(productsResponse.products[0].title, {
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPHSVU2_TEST_11:::When a rating is clicked, an HTTP GET request should be made with the id of the rating as the value to query parameter "rating":::5:::', async () => {
    mockGetCookie()
    const mockFetchFunction = jest.fn().mockImplementation(url => {
      if (url === 'https://apis.ccbp.in/prime-deals') {
        return {
          ok: true,
          json: () => Promise.resolve(primeDealsResponse),
        }
      }
      return {
        ok: true,
        json: () => Promise.resolve(productsResponse),
      }
    })
    window.fetch = mockFetchFunction
    renderWithBrowserRouter(<App />, {route: productsRoutePath})

    expect(
      await screen.findByText(productsResponse.products[0].title, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(
      await screen.findByRole('heading', {name: /Hair Dryer/i, exact: false}),
    ).toBeInTheDocument()

    userEvent.click(screen.getByRole('img', {name: /rating 4/i, exact: false}))
    expect(mockFetchFunction.mock.calls[2][0]).toMatch(/rating=4/)

    expect(
      await screen.findByText(productsResponse.products[0].title, {
        exact: false,
      }),
    ).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPHSVU2_TEST_12:::When all the filters in Products Route are applied and the "Clear Filters" button is clicked, then an HTTP GET request should be made to productsApiUrl with initial values of the query parameters:::5:::', async () => {
    mockGetCookie()
    const mockFetchFunction = jest.fn().mockImplementation(url => {
      if (url === 'https://apis.ccbp.in/prime-deals') {
        return {
          ok: true,
          json: () => Promise.resolve(primeDealsResponse),
        }
      }
      return {
        ok: true,
        json: () => Promise.resolve(productsResponse),
      }
    })
    window.fetch = mockFetchFunction
    renderWithBrowserRouter(<App />, {route: productsRoutePath})

    userEvent.type(screen.getByRole('searchbox'), 'machine')
    fireEvent.keyDown(screen.getByRole('searchbox'), {
      key: 'Enter',
      keyCode: 13,
      which: 13,
    })
    userEvent.click(screen.getByText(/Grocery/i, {exact: false}))
    userEvent.click(screen.getByRole('img', {name: /rating 4/i, exact: false}))

    expect(mockFetchFunction.mock.calls[4][0]).toMatch('title_search=machine')
    expect(mockFetchFunction.mock.calls[4][0]).toMatch('category=4')
    expect(mockFetchFunction.mock.calls[4][0]).toMatch('rating=4')

    userEvent.click(
      screen.getByRole('button', {name: /Clear Filters/i, exact: false}),
    )

    expect(mockFetchFunction.mock.calls[5][0]).not.toMatch(
      'title_search=machine',
    )
    expect(mockFetchFunction.mock.calls[5][0]).not.toMatch('category=4')
    expect(mockFetchFunction.mock.calls[5][0]).not.toMatch('rating=4')

    expect(mockFetchFunction.mock.calls[5][0]).toMatch('title_search=')
    expect(mockFetchFunction.mock.calls[5][0]).toMatch('category=')
    expect(mockFetchFunction.mock.calls[5][0]).toMatch('rating=')
    expect(
      await screen.findByText(productsResponse.products[0].title, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(
      await screen.findByRole('heading', {name: /Hair Dryer/i, exact: false}),
    ).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPHSVU2_TEST_13:::When the HTTP GET request made in Products Route is unsuccessful, then the page should consist of the HTML image element with alt attribute value as "products failure" and src as the given Failure view image URL:::5:::', async () => {
    mockGetCookie()
    server.use(
      rest.get(productsApiUrl, (req, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({message: 'Authorization Header is undefined'}),
        ),
      ),
    )
    renderWithBrowserRouter(<App />, {route: productsRoutePath})
    expect(
      await screen.findByRole('img', {name: /products failure/i, exact: false}),
    ).toBeInTheDocument()

    expect(
      await screen.findByRole('heading', {name: /Hair Dryer/i, exact: false}),
    ).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPHSVU2_TEST_14:::When the HTTP GET request made to productsApiUrl returns products list as empty, then no products view should be displayed:::5:::', async () => {
    mockGetCookie()
    const mockFetchFunction = jest.fn().mockImplementation(url => {
      if (url === 'https://apis.ccbp.in/prime-deals') {
        return {
          ok: true,
          json: () => Promise.resolve(primeDealsResponse),
        }
      }
      return {
        ok: true,
        json: () => Promise.resolve({products: []}),
      }
    })
    window.fetch = mockFetchFunction
    renderWithBrowserRouter(<App />, {route: productsRoutePath})

    expect(
      await screen.findByRole('img', {name: /no products/i, exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {name: /No Products Found/i}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/We could not find any products. Try other filters./i),
    ).toBeInTheDocument()

    expect(
      await screen.findByRole('heading', {name: /Hair Dryer/i, exact: false}),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })
})
