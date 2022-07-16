import {createMemoryHistory} from 'history'
import {Router, BrowserRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {setupServer} from 'msw/node'
import {rest} from 'msw'

import App from '../App'

const websiteLogo =
  'https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png'

const loginImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png'

const homeImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png'

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

describe(':::RJSCPH1TQT_TEST_SUITE_1:::Login Route tests', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
  })
  afterAll(() => {
    server.close()
  })

  it(':::RJSCPH1TQT_TEST_1:::When a user successfully login then the Cookies.set() method should be called:::5:::', async () => {
    mockSetCookie()
    renderWithBrowserRouter(<App />, {route: loginRoutePath})
    const usernameField = screen.getByLabelText(/USERNAME/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/PASSWORD/i, {
      exact: false,
    })
    const submitButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordField, 'rahul@2021')
    userEvent.click(submitButton)
    await waitFor(() => expect(Cookies.set).toHaveBeenCalled())

    restoreSetCookieFns()
  })
  it(':::RJSCPH1TQT_TEST_2:::When a user successfully login then the Cookies.set() method should be called with three arguments - "jwt_token" string as the first argument, JWT token value as the second argument and expiry days as the third argument:::5:::', async () => {
    mockSetCookie()
    renderWithBrowserRouter(<App />, {route: loginRoutePath})

    const usernameField = screen.getByLabelText(/USERNAME/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/PASSWORD/i, {
      exact: false,
    })
    const submitButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordField, 'rahul@2021')
    userEvent.click(submitButton)
    await waitFor(() =>
      expect(Cookies.set).toHaveBeenCalledWith(
        'jwt_token',
        loginSuccessResponse.jwt_token,
        expect.objectContaining({expires: expect.any(Number)}),
      ),
    )
    restoreSetCookieFns()
  })

  it(':::RJSCPH1TQT_TEST_3:::LoginRoute should consist of an HTML input element with "Username" as a placeholder:::5:::', () => {
    renderWithBrowserRouter(<App />, {route: loginRoutePath})
    expect(
      screen.getByPlaceholderText(/Username/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPH1TQT_TEST_4:::LoginRoute should consist of an HTML input element with "Password" as a placeholder:::5:::', () => {
    renderWithBrowserRouter(<App />, {route: loginRoutePath})
    expect(
      screen.getByPlaceholderText(/Password/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPH1TQT_TEST_5:::LoginRoute should consist of an HTML image element with the given logo URL as src and alt text as "website logo":::5:::', () => {
    renderWithBrowserRouter(<App />, {route: loginRoutePath})
    const imageEl = screen.getAllByRole('img', {name: /website logo/i})
    expect(imageEl[0]).toBeInTheDocument()
    expect(imageEl[0].src).toBe(websiteLogo)
  })

  it(':::RJSCPH1TQT_TEST_6:::LoginRoute should consist of an HTML image element with the given login URL as src and alt text as "website login":::5:::', () => {
    renderWithBrowserRouter(<App />, {route: loginRoutePath})
    const imageEl = screen.getByRole('img', {name: /website login/i})
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(loginImage)
  })

  it(':::RJSCPH1TQT_TEST_7:::LoginRoute should consist of an HTML label element with text content as "USERNAME":::5:::', () => {
    renderWithBrowserRouter(<App />, {route: loginRoutePath})
    expect(
      screen.getByLabelText(/USERNAME/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
  })
  it(':::RJSCPH1TQT_TEST_8:::LoginRoute should consist of the HTML input element with label text as "USERNAME":::5:::', () => {
    rtlRender(<App />, loginRoutePath)
    expect(
      screen.getByLabelText(/USERNAME/i, {
        exact: false,
      }).tagName,
    ).toBe('INPUT')
  })

  it(':::RJSCPH1TQT_TEST_9:::LoginRoute should consist of the HTML input element with label text as "PASSWORD":::5:::', () => {
    rtlRender(<App />, loginRoutePath)
    expect(
      screen.getByLabelText(/PASSWORD/i, {
        exact: false,
      }).tagName,
    ).toBe('INPUT')
  })

  it(':::RJSCPH1TQT_TEST_10:::LoginRoute should consist of the USERNAME input field with type as "text":::5:::', () => {
    renderWithBrowserRouter(<App />, {route: loginRoutePath})
    expect(
      screen.getByLabelText(/USERNAME/i, {
        exact: false,
      }).type,
    ).toBe('text')
  })

  it(':::RJSCPH1TQT_TEST_11:::LoginRoute should consist of the PASSWORD input field with type as "password":::5:::', () => {
    renderWithBrowserRouter(<App />, {route: loginRoutePath})
    expect(screen.getByLabelText(/PASSWORD/i, {exact: false}).type).toBe(
      'password',
    )
  })
  it(':::RJSCPH1TQT_TEST_12:::LoginRoute should consist of an HTML button element with "Login" as text content and type as "submit":::5:::', () => {
    renderWithBrowserRouter(<App />, {route: loginRoutePath})
    const buttonEl = screen.getByRole('button', {name: /Login/i, exact: false})
    expect(buttonEl).toBeInTheDocument()
    expect(buttonEl.type).toBe('submit')
  })
  it(':::RJSCPH1TQT_TEST_13:::When an authenticated user tries to access the LoginRoute then the page should be redirected to HomeRoute and consist of an HTML image element with the given image URL as src and alt text as "clothes that get you noticed":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: loginRoutePath})
    await waitFor(() => expect(window.location.pathname).toBe(homeRoutePath))
    const homeImgs = screen.getAllByRole('img', {
      name: /clothes that get you noticed/i,
      exact: false,
    })
    expect(homeImgs[0]).toBeInTheDocument()
    expect(homeImgs.some(eachImg => eachImg.src === homeImage)).toBe(true)
    restoreGetCookieFns()
  })

  it(':::RJSCPH1TQT_TEST_14:::When a valid username is provided and the login button is clicked with an empty password then the respective error message should be displayed using an HTML paragraph element:::5:::', async () => {
    renderWithBrowserRouter(<App />, {route: loginRoutePath})

    const usernameField = screen.getByLabelText(/USERNAME/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/PASSWORD/i, {
      exact: false,
    })
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    expect(window.location.pathname).toBe(loginRoutePath)

    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordField, '')
    userEvent.click(loginButton)
    expect(
      await screen.findByText(/Username or password is invalid/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
    const paragraphEl = screen.getByText(/Username or password is invalid/i, {
      exact: false,
    })
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCPH1TQT_TEST_15:::When a valid username is provided and the login button is clicked with an empty password then the respective error message should be displayed and the page should not be navigated:::5:::', async () => {
    renderWithBrowserRouter(<App />, {route: loginRoutePath})

    const usernameField = screen.getByLabelText(/USERNAME/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/PASSWORD/i, {
      exact: false,
    })
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    expect(window.location.pathname).toBe(loginRoutePath)

    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordField, '')
    userEvent.click(loginButton)

    expect(
      await screen.findByText(/Username or password is invalid/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(window.location.pathname).toBe(loginRoutePath)
  })

  it(':::RJSCPH1TQT_TEST_16:::When a non-empty password is provided and the login button is clicked with an empty username then the respective error message should be displayed and the page should not be navigated:::5:::', async () => {
    renderWithBrowserRouter(<App />, {route: loginRoutePath})

    const usernameField = screen.getByLabelText(/USERNAME/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/PASSWORD/i, {
      exact: false,
    })
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    expect(window.location.pathname).toBe('/login')

    userEvent.type(usernameField, '')
    userEvent.type(passwordField, 'rahul1')
    userEvent.click(loginButton)
    expect(
      await screen.findByText(/Username or password is invalid/i, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(window.location.pathname).toBe(loginRoutePath)
  })

  it(':::RJSCPH1TQT_TEST_17:::When an invalid username and password are provided and the login button is clicked then the respective error message should be displayed and the page should not be navigated:::5:::', async () => {
    renderWithBrowserRouter(<App />, {route: loginRoutePath})

    const usernameField = screen.getByLabelText(/USERNAME/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/PASSWORD/i, {
      exact: false,
    })
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    expect(window.location.pathname).toBe('/login')

    userEvent.type(usernameField, 'unknown')
    userEvent.type(passwordField, 'rahul@2021')
    userEvent.click(loginButton)
    expect(
      await screen.findByText(/Username is not found/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(window.location.pathname).toBe(loginRoutePath)
  })

  it(':::RJSCPH1TQT_TEST_18:::When a valid username and invalid password are provided and the login button is clicked then the respective error message should be displayed and the page should not be navigated:::5:::', async () => {
    renderWithBrowserRouter(<App />, {route: loginRoutePath})

    const usernameField = screen.getByLabelText(/USERNAME/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/PASSWORD/i, {
      exact: false,
    })
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    expect(window.location.pathname).toBe('/login')

    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordField, 'wrongPassword')
    userEvent.click(loginButton)

    expect(
      await screen.findByText(/Username and Password didn't match/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(window.location.pathname).toBe(loginRoutePath)
  })

  it(':::RJSCPH1TQT_TEST_19:::When a valid username and password are provided and the login button is clicked then the page should be navigated to HomeRoute and consist of an HTML image element with alt text as "clothes that get you noticed" :::5:::', async () => {
    renderWithBrowserRouter(<App />, {route: loginRoutePath})

    const usernameField = screen.getByLabelText(/USERNAME/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/PASSWORD/i, {
      exact: false,
    })
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })

    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordField, 'rahul@2021')
    userEvent.click(loginButton)
    mockGetCookie()

    await waitFor(() => expect(window.location.pathname).toBe(homeRoutePath))
    const imageEls = screen.getAllByRole('img', {
      name: /clothes that get you noticed/i,
      exact: false,
    })
    expect(imageEls[0]).toBeInTheDocument()
    expect(imageEls[0].src).toBe(homeImage)
    restoreGetCookieFns()
  })
  it(':::RJSCPH1TQT_TEST_20:::When a valid username and password are provided, the login button is clicked and the user has successfully logged in then the history.replace() method should be called:::5:::', async () => {
    const {history} = rtlRender(<App />, loginRoutePath)
    mockHistoryReplace(history)

    const usernameField = screen.getByLabelText(/USERNAME/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/PASSWORD/i, {
      exact: false,
    })
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordField, 'rahul@2021')
    userEvent.click(loginButton)
    await waitFor(() => expect(history.replace).toHaveBeenCalled())
    restoreHistoryReplace(history)
  })
  it(':::RJSCPH1TQT_TEST_21:::When a valid username and password are provided, the login button is clicked and the user has successfully logged in then the history.replace() method should be called with the argument "/":::5:::', async () => {
    const {history} = rtlRender(<App />, loginRoutePath)
    mockHistoryReplace(history)

    const usernameField = screen.getByLabelText(/USERNAME/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/PASSWORD/i, {
      exact: false,
    })
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
      exact: false,
    })
    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordField, 'rahul@2021')
    userEvent.click(loginButton)
    await waitFor(() => expect(history.replace).toHaveBeenCalledWith('/'))
    restoreHistoryReplace(history)
  })
})
