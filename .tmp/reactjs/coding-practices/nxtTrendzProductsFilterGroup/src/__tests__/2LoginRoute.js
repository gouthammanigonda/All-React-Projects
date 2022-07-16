import {createMemoryHistory} from 'history'
import {Router, BrowserRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {setupServer} from 'msw/node'
import {rest} from 'msw'

import App from '../App'

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

describe(':::RJSCPHSVU2_TEST_SUITE_2:::Login Route tests', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
  })
  afterAll(() => {
    server.close()
  })

  it(':::RJSCPHSVU2_TEST_15:::When "/login" is provided in the URL by an authenticated user, then the page should be navigated to Home Route and consists of an HTML image element with alt as "clothes that get you noticed" and src as given home image url:::5:::', async () => {
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

  it(':::RJSCPHSVU2_TEST_16:::When the Login is successful, then the history.replace() method should be called with the argument "/":::5:::', async () => {
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
