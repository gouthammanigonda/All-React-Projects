import 'jest-styled-components'
import {createMemoryHistory} from 'history'
import {Router, BrowserRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {rest} from 'msw'
import {setupServer} from 'msw/node'

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const websiteDarkThemeLogo =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

const loginRoutePath = '/login'
const trendingRoutePath = '/trending'
const gamingRoutePath = '/gaming'
const savedVideosRoutePath = '/saved-videos'

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

let historyInstance
const mockHistoryReplace = instance => {
  jest.spyOn(instance, 'replace')
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

const videosResponse = {
  total: 2,
  videos: [
    {
      channel: {
        name: 'Namasthe Javascript',
        profile_image_url:
          'https://yt3.ggpht.com/ytc/AKedOLThy0OwLxXhdxojcnN1jV02JCv8Ffnbe3Y7BA6T=s68-c-k-c0x00ffffff-no-rj',
      },
      id: '802fcd20-1490-43c5-9e66-ce6dfefb40d1',
      published_at: 'Oct 7, 2019',
      thumbnail_url:
        'https://i.ytimg.com/vi/cfVY9wLKltA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAZc-T-P1JxjqrqxJaCD02UbGNlHA',
      title: 'React Redux Tutorials - 14 - React Redux Setup100',
      view_count: '182K',
    },
    {
      channel: {
        name: 'Codevolution',
        profile_image_url:
          'https://yt3.ggpht.com/os7Yw6RimtysXXpc8NrXraci87TjXgZSUQyAezi0D3RrNL3YP5riIwi1-0al4Wz0XwzH6oBu6g=s88-c-k-c0x00ffffff-no-rj',
      },
      id: '4f757b30-06be-4776-b466-4181d6646729',
      published_at: 'Aug 21, 2021',
      thumbnail_url:
        'https://i.ytimg.com/an_webp/tQ80uAyqVyI/mqdefault_6s.webp?du=3000&sqp=CMD7gokG&rs=AOn4CLD9MJWdZK3yZQN8pwi7S8DAWF9bQQ',
      title: 'JSX Concepts in Hooks',
      view_count: '256K',
    },
  ],
}

const trendingVideosResponse = {
  total: 2,
  videos: [
    {
      channel: {
        name: 'RELOADER',
        profile_image_url:
          'https://yt3.ggpht.com/ytc/AKedOLThy0OwLxXhdxojcnN1jV02JCv8Ffnbe3Y7BA6T=s68-c-k-c0x00ffffff-no-rj',
      },
      id: 'a19d93d6-bdac-479e-b554-974ef9e6e66c',
      published_at: 'Jan 28, 2020',
      thumbnail_url:
        'https://i.ytimg.com/vi/cfVY9wLKltA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAZc-T-P1JxjqrqxJaCD02UbGNlHA',
      title: 'Node js Concepts Revision',
      view_count: '182K',
    },
    {
      channel: {
        name: 'Codevolution',
        profile_image_url:
          'https://yt3.ggpht.com/os7Yw6RimtysXXpc8NrXraci87TjXgZSUQyAezi0D3RrNL3YP5riIwi1-0al4Wz0XwzH6oBu6g=s88-c-k-c0x00ffffff-no-rj',
      },
      id: '4f757b30-06be-4776-b466-4181d6646729',
      published_at: 'Aug 1, 2021',
      thumbnail_url:
        'https://i.ytimg.com/an_webp/tQ80uAyqVyI/mqdefault_6s.webp?du=3000&sqp=CMD7gokG&rs=AOn4CLD9MJWdZK3yZQN8pwi7S8DAWF9bQQ',
      title: 'JSX Concepts in Hooks',
      view_count: '256K',
    },
  ],
}

const gamingVideosResponse = {
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

const videoDetailsResponse = {
  video_details: {
    channel: {
      name: 'Namasthe Javascript',
      profile_image_url:
        'https://yt3.ggpht.com/os7Yw6RimtysXXpc8NrXraci87TjXgZSUQyAezi0D3RrNL3YP5riIwi1-0al4Wz0XwzH6oBu6g=s88-c-k-c0x00ffffff-no-rj',
      subscriber_count: '12M',
    },
    description:
      '++ Twitter - https://twitter.com/CodevolutionWeb+ Facebook - https://www.facebook.com/codevolutionweb Kite Code Completetion - https://www.kite.com/get-kite/?utm_me...',
    id: '802fcd20-1490-43c5-9e66-ce6dfefb40d1',
    published_at: 'Oct 7, 2019',
    thumbnail_url:
      'https://i.ytimg.com/an_webp/tQ80uAyqVyI/mqdefault_6s.webp?du=3000&sqp=CMD7gokG&rs=AOn4CLD9MJWdZK3yZQN8pwi7S8DAWF9bQQ',
    title: 'React Redux Tutorials - 14 - React Redux Setup100',
    video_url: 'https://www.youtube.com/watch?v=0bVP5cYhMuU&t=1s',
    view_count: '182K',
  },
}

const homeVideosApiUrl =
  'https://apis.ccbp.in/videos/all'

const trendingVideosApiUrl =
  'https://apis.ccbp.in/videos/trending'

const gamingVideosApiUrl =
  'https://apis.ccbp.in/videos/gaming'

const videoDetailsApiUrl =
  'https://apis.ccbp.in/videos/:id'

const handlers = [
  rest.get(homeVideosApiUrl, (req, res, ctx) => res(ctx.json(videosResponse))),
  rest.get(trendingVideosApiUrl, (req, res, ctx) =>
    res(ctx.json(trendingVideosResponse)),
  ),
  rest.get(gamingVideosApiUrl, (req, res, ctx) =>
    res(ctx.json(gamingVideosResponse)),
  ),
  rest.get(videoDetailsApiUrl, (req, res, ctx) =>
    res(ctx.json(videoDetailsResponse)),
  ),
]

const server = setupServer(...handlers)

const originalConsoleError = console.error
const originalFetch = window.fetch

describe(':::RJSCPYQN94_TEST_SUITE_6:::Home Route Logout tests', () => {
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

  it(':::RJSCPYQN94_TEST_93:::When the theme button is clicked then the Home Route should consist of an HTML image element in the Header with alt attribute value as "website logo" and src as given dark theme logo URL:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    expect(
      await screen.findByText(videosResponse.videos[0].title, {exact: false}),
    ).toBeInTheDocument()

    userEvent.click(screen.getAllByTestId('theme')[0])

    expect(
      screen.getAllByRole('img', {name: /website logo/i, exact: false})[0],
    ).toBeInTheDocument()

    expect(
      screen.getAllByRole('img', {name: /website logo/i, exact: false})[0].src,
    ).toBe(websiteDarkThemeLogo)

    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_94:::When the theme button is clicked in the Home Route, then the Trending link is clicked, then the page should be navigated to Trending Route and the theme should remain the same:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    expect(
      await screen.findByText(videosResponse.videos[0].title, {exact: false}),
    ).toBeInTheDocument()

    userEvent.click(screen.getAllByTestId('theme')[0])

    expect(
      screen.getAllByRole('img', {name: /website logo/i, exact: false})[0],
    ).toBeInTheDocument()

    expect(
      screen.getAllByRole('img', {name: /website logo/i, exact: false})[0].src,
    ).toBe(websiteDarkThemeLogo)

    const trendingBtn = screen.getByRole('link', {
      hidden: true,
      name: /Trending/i,
      exact: false,
    })

    userEvent.click(trendingBtn)

    expect(
      await screen.findByText(trendingVideosResponse.videos[0].title, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(window.location.pathname).toBe(trendingRoutePath)

    expect(
      screen.getAllByRole('img', {name: /website logo/i, exact: false})[0],
    ).toBeInTheDocument()

    expect(
      screen.getAllByRole('img', {name: /website logo/i, exact: false})[0].src,
    ).toBe(websiteDarkThemeLogo)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_95:::When the theme button is clicked then the Home Route should consist of a dark theme and the "#181818" color provided should be applied as the background color for the styled component with data-testid as "home":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    expect(
      await screen.findByText(videosResponse.videos[0].title, {exact: false}),
    ).toBeInTheDocument()

    userEvent.click(screen.getAllByTestId('theme')[0])

    expect(screen.getByTestId('home')).toHaveStyle('background-color: #181818')
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_96:::When the HTML button element with data-testid attribute value as "close" is clicked in the banner, then the page should not consist of an HTML paragraph element with text content starting with "Buy Nxt Watch Premium" :::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    const storeAwaitFunction = await screen.findAllByText(
      videosResponse.videos[0].title,
      {
        exact: false,
      },
    )
    expect(storeAwaitFunction[0]).toBeInTheDocument()
    userEvent.click(screen.getByTestId('close'))
    expect(screen.queryByText(/Buy Nxt Watch Premium/i)).not.toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_97:::When the Logout button in the Header of the Home Route is clicked, then the page should consist of Popup from reactjs-popup:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByText(videosResponse.videos[0].title, {exact: false}),
    ).toBeInTheDocument()
    userEvent.click(
      screen.getByRole('button', {
        hidden: true,
        name: /Logout/i,
        exact: false,
      }),
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it(':::RJSCPYQN94_TEST_98:::When the Logout button in the Header of the Home Route is clicked, then the page should consist of an HTML paragraph element with text content as "Are you sure, you want to logout":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByText(videosResponse.videos[0].title, {exact: false}),
    ).toBeInTheDocument()
    userEvent.click(
      screen.getByRole('button', {
        hidden: true,
        name: /Logout/i,
        exact: false,
      }),
    )
    const paragraphEl = screen.getByText(/^Are you sure, you want to logout/i, {
      exact: false,
    })
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_99:::When the Logout button in the Header of the Home Route is clicked, then the page should consist of an HTML button element with text content as "Cancel":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByText(videosResponse.videos[0].title, {exact: false}),
    ).toBeInTheDocument()
    userEvent.click(
      screen.getByRole('button', {
        hidden: true,
        name: /Logout/i,
        exact: false,
      }),
    )
    expect(
      screen.getByRole('button', {
        name: /Cancel/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_100:::When the Logout button in the Header of the Home Route is clicked, then the page should consist of an HTML button element with text content as "Confirm":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByText(videosResponse.videos[0].title, {exact: false}),
    ).toBeInTheDocument()
    userEvent.click(
      screen.getByRole('button', {
        hidden: true,
        name: /Logout/i,
        exact: false,
      }),
    )
    expect(
      screen.getByRole('button', {
        name: /Confirm/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_101:::When the HTML button element with text content as "Cancel" is clicked, then the page should not consist of Popup from reactjs-popup:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByText(videosResponse.videos[0].title, {exact: false}),
    ).toBeInTheDocument()
    userEvent.click(
      screen.getByRole('button', {
        hidden: true,
        name: /Logout/i,
        exact: false,
      }),
    )
    expect(
      screen.getByRole('button', {
        name: /Cancel/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    userEvent.click(
      screen.getByRole('button', {
        name: /Cancel/i,
        exact: false,
      }),
    )

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_102:::When the Logout Popup is opened and the confirm button in the popup is clicked, then the Cookies.remove() method should be called with the argument as "jwt_token":::5:::', async () => {
    mockRemoveCookie()
    mockGetCookie()
    rtlRender(<App />)
    expect(
      await screen.findByText(videosResponse.videos[0].title, {exact: false}),
    ).toBeInTheDocument()

    const logoutBtn = screen.getByRole('button', {
      hidden: true,
      name: /Logout/i,
      exact: false,
    })
    userEvent.click(logoutBtn)

    expect(
      screen.getByRole('button', {
        name: /Confirm/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    const popupLogoutBtn = screen.getByRole('button', {
      name: /Confirm/i,
      exact: false,
    })

    userEvent.click(popupLogoutBtn)
    expect(Cookies.remove).toHaveBeenCalledWith('jwt_token')
    restoreRemoveCookieFns()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_103:::When the Logout Popup is opened and the confirm button in the popup is clicked, the history.replace() method should be called with the argument as "/login":::5:::', async () => {
    mockRemoveCookie()
    mockGetCookie()
    const {history} = rtlRender(<App />)
    expect(
      await screen.findByText(videosResponse.videos[0].title, {exact: false}),
    ).toBeInTheDocument()
    mockHistoryReplace(history)
    const logoutBtn = screen.getByRole('button', {
      hidden: true,
      name: /Logout/i,
      exact: false,
    })
    userEvent.click(logoutBtn)

    expect(
      screen.getByRole('button', {
        name: /Confirm/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    const popupLogoutBtn = screen.getByRole('button', {
      name: /Confirm/i,
      exact: false,
    })

    userEvent.click(popupLogoutBtn)

    expect(history.replace).toHaveBeenCalledWith(loginRoutePath)
    restoreRemoveCookieFns()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_104:::When the Logout Popup is opened and the confirm button in the popup is clicked, then the page should be navigated to Login Route:::5:::', async () => {
    mockGetCookie()
    mockRemoveCookie()
    renderWithBrowserRouter(<App />)

    expect(
      await screen.findByText(videosResponse.videos[0].title, {exact: false}),
    ).toBeInTheDocument()

    const logoutBtn = screen.getByRole('button', {
      hidden: true,
      name: /Logout/i,
      exact: false,
    })
    restoreGetCookieFns()
    mockGetCookie(false)
    userEvent.click(logoutBtn)
    expect(
      screen.getByRole('button', {
        name: /Confirm/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    const popupLogoutBtn = screen.getByRole('button', {
      name: /Confirm/i,
      exact: false,
    })

    userEvent.click(popupLogoutBtn)
    expect(window.location.pathname).toBe(loginRoutePath)
    restoreRemoveCookieFns()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_105:::When the Trending link in the sidebar is clicked then the page should be navigated to TrendingRoute:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    expect(
      await screen.findByText(videosResponse.videos[0].title, {exact: false}),
    ).toBeInTheDocument()

    const trendingBtn = screen.getByRole('link', {
      hidden: true,
      name: /Trending/i,
      exact: false,
    })
    userEvent.click(trendingBtn)

    expect(
      await screen.findByText(trendingVideosResponse.videos[0].title, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(window.location.pathname).toBe(trendingRoutePath)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_106:::When the Gaming link in the sidebar is clicked then the page should be navigated to GamingRoute:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    expect(
      await screen.findByText(videosResponse.videos[0].title, {exact: false}),
    ).toBeInTheDocument()

    const gamingBtn = screen.getByRole('link', {
      hidden: true,
      name: /Gaming/i,
      exact: false,
    })
    userEvent.click(gamingBtn)

    expect(
      await screen.findByText(gamingVideosResponse.videos[0].title, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(window.location.pathname).toBe(gamingRoutePath)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_107:::When the SavedVideos link in the sidebar is clicked then the page should be navigated to SavedVideosRoute:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    expect(
      await screen.findByText(videosResponse.videos[0].title, {exact: false}),
    ).toBeInTheDocument()

    const savedVideosBtn = screen.getByRole('link', {
      hidden: true,
      name: /Saved Videos/i,
      exact: false,
    })
    userEvent.click(savedVideosBtn)
    expect(window.location.pathname).toBe(savedVideosRoutePath)
    restoreGetCookieFns()
  })
  // #endregion
})
