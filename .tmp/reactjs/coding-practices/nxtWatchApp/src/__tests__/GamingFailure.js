import 'jest-styled-components'
import {BrowserRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {rest} from 'msw'
import {setupServer} from 'msw/node'

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const errorView =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

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

const renderWithBrowserRouter = (ui, {route = '/gaming'} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

const videosResponse = {
  total: 2,
  videos: [
    {
      id: '802fcd20-1490-43c5-9e66-ce6dfefb40d1',
      thumbnail_url:
        'https://i.ytimg.com/vi/cfVY9wLKltA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAZc-T-P1JxjqrqxJaCD02UbGNlHA',
      title: 'React Redux Tutorials - 14 - React Redux Setup100',
      view_count: '182K',
    },
    {
      id: '4f757b30-06be-4776-b466-4181d6646729',
      thumbnail_url:
        'https://i.ytimg.com/an_webp/tQ80uAyqVyI/mqdefault_6s.webp?du=3000&sqp=CMD7gokG&rs=AOn4CLD9MJWdZK3yZQN8pwi7S8DAWF9bQQ',
      title: 'JSX Concepts in Hooks',
      view_count: '256K',
    },
  ],
}

const gamingVideosApiUrl = 'https://apis.ccbp.in/videos/gaming'
const handlers = [
  rest.get(gamingVideosApiUrl, (req, res, ctx) =>
    res(ctx.json(videosResponse)),
  ),
]

const server = setupServer(...handlers)

const originalConsoleError = console.error
const originalFetch = window.fetch

describe(':::RJSCPYQN94_TEST_SUITE_2:::Gaming Route Failure tests', () => {
  beforeAll(() => {
    server.listen()
  })

  afterAll(() => {
    server.close()
  })

  afterEach(() => {
    server.resetHandlers()
    console.error = originalConsoleError
    window.fetch = originalFetch
  })

  it(':::RJSCPYQN94_TEST_25:::When the HTTP GET request made in Gaming Route is unsucessfull, the page should consist of the HTML image element with alt attribute value as "failure view" and src as the given Failure view image URL:::5:::', async () => {
    mockGetCookie()
    server.use(
      rest.get(gamingVideosApiUrl, (req, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({message: 'Authorization Header is undefined'}),
        ),
      ),
    )
    renderWithBrowserRouter(<App />)
    const imgEl = await screen.findByRole('img', {
      name: /failure view/i,
      exact: false,
    })
    expect(imgEl).toBeInTheDocument()
    expect(imgEl.src).toBe(errorView)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_26:::When the HTTP GET request made in Gaming Route is unsucessfull, the page should consist of the HTML main heading element with text content as "Oops! Something Went Wrong":::5:::', async () => {
    mockGetCookie()
    server.use(
      rest.get(gamingVideosApiUrl, (req, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({message: 'Authorization Header is undefined'}),
        ),
      ),
    )
    renderWithBrowserRouter(<App />)

    expect(
      await screen.findByRole('heading', {
        name: /Oops! Something Went Wrong/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_27:::When the HTTP GET request made in Gaming Route is unsucessfull, the page should consist of the HTML paragraph element with text content as "We are having some trouble":::5:::', async () => {
    mockGetCookie()
    server.use(
      rest.get(gamingVideosApiUrl, (req, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({message: 'Authorization Header is undefined'}),
        ),
      ),
    )
    renderWithBrowserRouter(<App />)

    const paragraphEl = await screen.findByText(/We are having some trouble/i, {
      exact: false,
    })
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_28:::When the HTTP GET request made in Gaming Route is unsucessfull, the page should consist of the HTML button element with text content as "Retry":::5:::', async () => {
    mockGetCookie()
    server.use(
      rest.get(gamingVideosApiUrl, (req, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({message: 'Authorization Header is undefined'}),
        ),
      ),
    )
    renderWithBrowserRouter(<App />)

    expect(
      await screen.findByRole('button', {name: /Retry/i, exact: false}),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_29:::When the HTTP GET request made in Gaming Route is unsucessfull and the "Retry" button is clicked, then an HTTP GET request should be made to gamingVideosApiUrl:::5:::', async () => {
    mockGetCookie()
    const mockFetchFunction = jest.fn().mockImplementation(() => ({
      ok: false,
      json: () => Promise.resolve({}),
    }))
    window.fetch = mockFetchFunction
    renderWithBrowserRouter(<App />)
    const buttonEl = await screen.findByRole('button', {
      name: /Retry/i,
      exact: false,
    })
    expect(buttonEl).toBeInTheDocument()
    userEvent.click(buttonEl)
    expect(mockFetchFunction.mock.calls[1][0]).toBe(`${gamingVideosApiUrl}`)
    restoreGetCookieFns()
  })

  // #endregion
})
