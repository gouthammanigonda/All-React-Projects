import {createMemoryHistory} from 'history'
import {Router, BrowserRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {setupServer} from 'msw/node'
import {rest} from 'msw'

import App from '../App'

const loginRoutePath = '/login'
const homeRoutePath = '/'

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

let historyInstance
const mockHistoryReplace = instance => {
  jest.spyOn(instance, 'replace')
}

const restoreHistoryReplace = instance => {
  instance.replace.mockRestore()
}

const mockSetCookie = () => {
  jest.spyOn(Cookies, 'set')
  Cookies.set = jest.fn()
}

const restoreSetCookieFns = () => {
  Cookies.set.mockRestore()
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

describe(':::RJSCPFGWRF_TEST_SUITE_1:::Login Route tests', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
  })
  afterAll(() => {
    server.close()
  })

  it(':::RJSCPFGWRF_TEST_1:::LoginRoute should consist of an HTML heading element with "Please Login" as text content:::5:::', () => {
    renderWithBrowserRouter(<App />, {route: loginRoutePath})
    expect(
      screen.getByRole('heading', {name: /Please Login/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCPFGWRF_TEST_2:::LoginRoute should consist of an HTML button element with "Login with Sample Creds" as text content:::5:::', () => {
    renderWithBrowserRouter(<App />, {route: loginRoutePath})
    expect(
      screen.getByRole('button', {
        name: /Login with Sample Creds/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPFGWRF_TEST_3:::When an authenticated user tries to access the LoginRoute then the page should be redirected to HomeRoute and consist of an HTML heading element with "Home Route" as text content:::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: loginRoutePath})
    expect(window.location.pathname).toBe(homeRoutePath)
    expect(
      screen.getByRole('heading', {name: /Home Route/i, exact: false}),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPFGWRF_TEST_4:::When a user successfully login then the Cookies.set() method should be called:::5:::', async () => {
    mockSetCookie()
    renderWithBrowserRouter(<App />, {route: loginRoutePath})

    const loginButton = screen.getByRole('button', {
      name: /Login with sample Creds/i,
      exact: false,
    })

    userEvent.click(loginButton)
    await waitFor(() => expect(Cookies.set).toHaveBeenCalled())
    restoreSetCookieFns()
  })

  it(':::RJSCPFGWRF_TEST_5:::When a user successfully login then the Cookies.set() method should be called with three arguments - "jwt_token" string as the first argument, JWT token value as the second argument and expiry days as the third argument:::5:::', async () => {
    mockSetCookie()
    renderWithBrowserRouter(<App />, {route: loginRoutePath})

    const loginButton = screen.getByRole('button', {
      name: /Login with sample Creds/i,
      exact: false,
    })

    userEvent.click(loginButton)
    await waitFor(() =>
      expect(Cookies.set).toHaveBeenCalledWith(
        'jwt_token',
        loginSuccessResponse.jwt_token,
        expect.objectContaining({expires: expect.any(Number)}),
      ),
    )
    restoreSetCookieFns()
  })
  it(':::RJSCPFGWRF_TEST_6:::When the login button is clicked in the LoginRoute and the user has successfully logged in then the history.replace() method should be called:::5:::', async () => {
    mockSetCookie()
    const {history} = rtlRender(<App />, loginRoutePath)
    mockHistoryReplace(history)

    const loginButton = screen.getByRole('button', {
      name: /Login with sample Creds/i,
      exact: false,
    })

    userEvent.click(loginButton)
    await waitFor(() => expect(history.replace).toHaveBeenCalled())
    restoreHistoryReplace(history)
    restoreSetCookieFns()
  })
  it(':::RJSCPFGWRF_TEST_7:::When the login button is clicked in the LoginRoute and the user has successfully logged in then the history.replace() method should be called with the argument "/":::5:::', async () => {
    mockSetCookie()
    const {history} = rtlRender(<App />, loginRoutePath)
    mockHistoryReplace(history)

    const loginButton = screen.getByRole('button', {
      name: /Login with sample Creds/i,
      exact: false,
    })
    userEvent.click(loginButton)
    await waitFor(() => expect(history.replace).toHaveBeenCalledWith('/'))
    restoreHistoryReplace(history)
    restoreSetCookieFns()
  })
  it(':::RJSCPFGWRF_TEST_8:::When the login button is clicked in the LoginRoute then the page should be navigated to HomeRoute and consist of an HTML heading element with "Home Route" as text content on a successful login:::5:::', async () => {
    mockSetCookie()
    renderWithBrowserRouter(<App />, {route: loginRoutePath})

    const loginButton = screen.getByRole('button', {
      name: /Login with sample Creds/i,
      exact: false,
    })
    userEvent.click(loginButton)
    mockGetCookie()
    await waitFor(() => expect(window.location.pathname).toBe(homeRoutePath))
    expect(screen.getByRole('heading', {name: /Home Route/i, exact: false}))

    restoreSetCookieFns()
    restoreGetCookieFns()
  })
})
