import {BrowserRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {setupServer} from 'msw/node'
import {rest} from 'msw'

import App from '../App'

const loginRoutePath = '/login'
const homeRoutePath = '/'
const aboutRoutePath = '/about'

const loginSuccessResponse = {
  jwt_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwiaWF0IjoxNjE5MDk0MjQxfQ.1i6BbQkQvtvpv72lHPNbl2JOZIB03uRcPbchYYCkL9o',
}

const passwordIncorrect = {
  error_msg: "Username and Password didn't match",
}

const invalidUser = {
  error_msg: 'Username is not found',
}
const invalidInputs = {
  error_msg: 'Username or password is invalid',
}

const apiUrl = 'https://apis.ccbp.in/login'

const server = setupServer(
  rest.post(apiUrl, (req, res, ctx) => {
    const {username} = JSON.parse(req.body)
    const {password} = JSON.parse(req.body)

    if (
      username === '' ||
      password === '' ||
      username === undefined ||
      password === undefined
    )
      return res(ctx.status(400, 'invalid request'), ctx.json(invalidInputs))
    if (username === 'rahul' && password === 'rahul@2021')
      return res(ctx.json(loginSuccessResponse))
    if (username === 'rahul' && password !== 'rahul@2021')
      return res(
        ctx.status(401, 'invalid request'),
        ctx.json(passwordIncorrect),
      )
    return res(ctx.status(404, 'invalid request'), ctx.json(invalidUser))
  }),
)

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

describe(':::RJSCPFGWRF_TEST_SUITE_3:::About Route tests', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
  })
  afterAll(() => {
    server.close()
  })

  it(':::RJSCPFGWRF_TEST_20:::AboutRoute should consist of a Link from react-router-dom with "Home" as text content:::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: aboutRoutePath})
    expect(
      screen.getByRole('link', {
        name: /Home/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPFGWRF_TEST_21:::AboutRoute should consist of a Link from react-router-dom with "About" as text content:::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: aboutRoutePath})
    expect(
      screen.getByRole('link', {
        name: /About/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPFGWRF_TEST_22:::AboutRoute should consist of an HTML button element with "Logout" as text content:::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: aboutRoutePath})
    expect(
      screen.getByRole('button', {
        name: /Logout/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPFGWRF_TEST_23:::When an unauthenticated user tries to access the AboutRoute then the page should be redirected to LoginRoute and consist of an HTML heading element with "Please Login" as text content:::5:::', async () => {
    mockGetCookie(false)

    renderWithBrowserRouter(<App />, {route: aboutRoutePath})
    expect(window.location.pathname).toBe(loginRoutePath)
    expect(
      screen.getByRole('heading', {name: /Please Login/i, exact: false}),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPFGWRF_TEST_24:::When an authenticated user tries to access the AboutRoute then the page should be navigated to AboutRoute and consist of an HTML heading element with "About Route" as text content:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: aboutRoutePath})

    expect(
      screen.getByRole('heading', {
        name: /About Route/i,
        exact: false,
      }),
    )
    restoreGetCookieFns()
  })

  it(':::RJSCPFGWRF_TEST_25:::When the Home link is clicked in the AboutRoute then the page should be navigated to HomeRoute and consist of an HTML heading element with "Home Route" as text content:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: aboutRoutePath})

    const homeLink = screen.getByRole('link', {
      name: /Home/i,
      exact: false,
    })
    userEvent.click(homeLink)
    await waitFor(() => expect(window.location.pathname).toBe(homeRoutePath))
    expect(
      screen.getByRole('heading', {
        name: /Home Route/i,
        exact: false,
      }),
    )
    restoreGetCookieFns()
  })
})
