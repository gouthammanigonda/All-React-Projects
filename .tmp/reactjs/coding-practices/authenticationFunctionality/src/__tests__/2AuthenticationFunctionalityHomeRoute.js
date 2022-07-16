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

describe(':::RJSCPFGWRF_TEST_SUITE_2:::Home Route tests', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
  })
  afterAll(() => {
    server.close()
  })

  it(':::RJSCPFGWRF_TEST_9:::HomeRoute should consist of a Link from react-router-dom with "Home" as text content:::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: homeRoutePath})
    expect(
      screen.getByRole('link', {
        name: /Home/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPFGWRF_TEST_10:::HomeRoute should consist of a Link from react-router-dom with "About" as text content:::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: homeRoutePath})
    expect(
      screen.getByRole('link', {
        name: /About/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPFGWRF_TEST_11:::HomeRoute should consist of an HTML button element with "Logout" as text content:::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: homeRoutePath})
    expect(
      screen.getByRole('button', {
        name: /Logout/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPFGWRF_TEST_12:::When an unauthenticated user tries to access the HomeRoute then the page should be redirected to LoginRoute and consist of an HTML heading element with "Please Login" as text content:::5:::', () => {
    mockGetCookie(false)
    renderWithBrowserRouter(<App />, {route: homeRoutePath})
    expect(window.location.pathname).toBe(loginRoutePath)
    expect(
      screen.getByRole('heading', {name: /Please Login/i, exact: false}),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPFGWRF_TEST_13:::When an authenticated user tries to access the HomeRoute then the page should be navigated to HomeRoute and consist of an HTML heading element with "Home Route" as text content:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: homeRoutePath})
    expect(
      screen.getByRole('heading', {
        name: /Home Route/i,
        exact: false,
      }),
    )
    restoreGetCookieFns()
  })

  it(':::RJSCPFGWRF_TEST_14:::When the About link is clicked in the HomeRoute then the page should be navigated to AboutRoute and consist of an HTML heading element with "About Route" as text content:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: homeRoutePath})

    const aboutLink = screen.getByRole('link', {
      name: /About/i,
      exact: false,
    })
    userEvent.click(aboutLink)
    await waitFor(() => expect(window.location.pathname).toBe(aboutRoutePath))
    expect(
      screen.getByRole('heading', {
        name: /About Route/i,
        exact: false,
      }),
    )
    restoreGetCookieFns()
  })

  it(':::RJSCPFGWRF_TEST_15:::When the logout button is clicked then the Cookies.remove() method should be called:::5:::', () => {
    mockRemoveCookie()
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: homeRoutePath})

    const logoutBtn = screen.getByRole('button', {
      name: /Logout/i,
      exact: false,
    })

    userEvent.click(logoutBtn)
    expect(Cookies.remove).toHaveBeenCalled()
    restoreRemoveCookieFns()
    restoreGetCookieFns()
  })

  it(':::RJSCPFGWRF_TEST_16:::When the logout button is clicked then the Cookies.remove() method should be called with the "jwt_token" string as an argument:::5:::', () => {
    mockRemoveCookie()
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: homeRoutePath})

    const logoutBtn = screen.getByRole('button', {
      name: /logout/i,
      exact: false,
    })
    userEvent.click(logoutBtn)
    expect(Cookies.remove).toHaveBeenCalledWith('jwt_token')
    restoreRemoveCookieFns()
    restoreGetCookieFns()
  })
  it(':::RJSCPFGWRF_TEST_17:::When the logout button is clicked then the history.replace() method should be called:::5:::', () => {
    mockRemoveCookie()
    mockGetCookie()
    const {history} = rtlRender(<App />, homeRoutePath)
    mockHistoryReplace(history)
    const logoutBtn = screen.getByRole('button', {
      name: /logout/i,
      exact: false,
    })
    userEvent.click(logoutBtn)
    expect(history.replace).toHaveBeenCalled()
    restoreRemoveCookieFns()
    restoreGetCookieFns()
    restoreHistoryReplace(history)
  })
  it(':::RJSCPFGWRF_TEST_18:::When the logout button is clicked then the history.replace() method should be called with the argument "/login":::5:::', async () => {
    mockRemoveCookie()
    mockGetCookie()
    const {history} = rtlRender(<App />, homeRoutePath)
    mockHistoryReplace(history)
    const logoutBtn = screen.getByRole('button', {
      name: /logout/i,
      exact: false,
    })
    userEvent.click(logoutBtn)
    expect(history.replace).toHaveBeenCalledWith(loginRoutePath)
    restoreRemoveCookieFns()
    restoreGetCookieFns()
  })
  it(':::RJSCPFGWRF_TEST_19:::When the logout button is clicked then the page should be navigated to LoginRoute and consist of an HTML button element with "Login with Sample Creds" as text content:::5:::', async () => {
    mockGetCookie()
    mockRemoveCookie()
    renderWithBrowserRouter(<App />, {route: homeRoutePath})
    const logoutBtn = screen.getByRole('button', {
      name: /logout/i,
      exact: false,
    })
    restoreGetCookieFns()
    mockGetCookie(false)
    userEvent.click(logoutBtn)
    await waitFor(() => expect(window.location.pathname).toBe(loginRoutePath))
    expect(
      screen.getByRole('button', {
        name: /Login with Sample Creds/i,
        exact: false,
      }),
    )
    restoreRemoveCookieFns()
    restoreGetCookieFns()
  })
})
