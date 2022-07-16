import 'jest-styled-components'
import {createMemoryHistory} from 'history'
import {Router, BrowserRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {formatDistanceStrict} from 'date-fns'

import {rest} from 'msw'
import {setupServer} from 'msw/node'

import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const websiteLogo =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
const websiteDarkThemeLogo =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
const profilePicImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png'
const emptySavedVideosImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png'
const facebookLogo =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png'
const twitterLogo =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png'
const linkedInLogo =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png'

const loginRoutePath = '/login'
const homeRoutePath = '/'
const trendingRoutePath = '/trending'
const gamingRoutePath = '/gaming'
const savedVideosRoutePath = '/saved-videos'
const videoItemDetailRoutePath = '/videos/802fcd20-1490-43c5-9e66-ce6dfefb40d1'

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

const rtlRender = (ui = <App />, path = '/saved-videos') => {
  historyInstance = createMemoryHistory()
  historyInstance.push(path)
  render(<Router history={historyInstance}>{ui}</Router>)
  return {
    history: historyInstance,
  }
}

const renderWithBrowserRouter = (ui, {route = '/saved-videos'} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

const homeVideosResponse = {
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

const trendingVideosApiUrl = 'https://apis.ccbp.in/videos/trending'

const homeVideosApiUrl = 'https://apis.ccbp.in/videos/all'

const gamingVideosApiUrl = 'https://apis.ccbp.in/videos/gaming'

const videoDetailsApiUrl = 'https://apis.ccbp.in/videos/:id'

const handlers = [
  rest.get(trendingVideosApiUrl, (req, res, ctx) =>
    res(ctx.json(trendingVideosResponse)),
  ),
  rest.get(homeVideosApiUrl, (req, res, ctx) =>
    res(ctx.json(homeVideosResponse)),
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

describe(':::RJSCPYQN94_TEST_SUITE_9:::SavedVideos Route tests', () => {
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

  // #region UI Test Cases

  it(':::RJSCPYQN94_TEST_136:::Page should consist of at least two HTML list items and the navItemsList should be rendered using a unique key as a prop for each nav item respectively :::5:::', async () => {
    mockGetCookie()
    console.error = message => {
      if (
        /Each child in a list should have a unique "key" prop/.test(message) ||
        /Encountered two children with the same key/.test(message)
      ) {
        throw new Error(message)
      }
    }
    renderWithBrowserRouter(<App />)
    expect(
      screen.getAllByRole('listitem', {hidden: true}).length,
    ).toBeGreaterThanOrEqual(1)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_137:::When "/saved-videos" is provided as the URL by an unauthenticated user, then the page should be navigated to Login Route:::5:::', () => {
    mockGetCookie(false)
    renderWithBrowserRouter(<App />)
    expect(window.location.pathname).toBe(loginRoutePath)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_138:::When "/saved-videos" is provided as the URL by an authenticated user, then the page should be navigated to SavedVideos Route:::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(window.location.pathname).toBe(savedVideosRoutePath)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_139:::SavedVideos Route should consist of an HTML image element in the Header with alt attribute value as "website logo" and src as given logo URL:::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    const imageEls = screen.getAllByRole('img', {
      name: /website logo/i,
      exact: false,
    })
    expect(imageEls[0]).toBeInTheDocument()
    expect(imageEls[0].src).toBe(websiteLogo)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_140:::SavedVideos Route should consist of an HTML image element in the Header with alt attribute value as "website logo" and src as the given logo URL is wrapped with Link from react-router-dom:::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(
      screen.getAllByRole('link', {
        name: /website logo/,
        exact: false,
      })[0],
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_141:::SavedVideos Route should consist of an HTML button element with data-testid attribute value as "theme" in the Header:::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    const themeButton = screen.getAllByTestId('theme')

    expect(themeButton[0]).toBeInTheDocument()
    expect(themeButton[0].tagName).toBe('BUTTON')
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_142:::SavedVideos Route should consist of an HTML image element in the Header with alt attribute value as "profile" and src as the value of given profile image URL:::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    const imageEl = screen.getByRole('img', {
      hidden: true,
      name: /profile/i,
      exact: false,
    })
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(profilePicImage)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_143:::SavedVideos Route should consist of an HTML button element with text content as "Logout" in the Header:::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(
      screen.getByRole('button', {
        hidden: true,
        name: /Logout/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_144:::SavedVideos Route should consist of at least one HTML unordered list element to display nav items:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    const ListItems = await screen.findAllByRole('list', {hidden: true})
    expect(ListItems[0].tagName).toBe('UL')
    expect(ListItems.length).toBeGreaterThanOrEqual(1)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_145:::SavedVideos Route should consist of "Home" text wrapped with Link from react-router-dom:::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    expect(
      screen.getByRole('link', {
        hidden: true,
        name: /Home/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_146:::SavedVideos Route should consist of "Trending" text wrapped with Link from react-router-dom:::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    expect(
      screen.getByRole('link', {
        hidden: true,
        name: /Trending/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_147:::SavedVideos Route should consist of "Gaming" text wrapped with Link from react-router-dom:::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    expect(
      screen.getByRole('link', {
        hidden: true,
        name: /Gaming/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_148:::SavedVideos Route should consist of "Saved videos" text wrapped with Link from react-router-dom:::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    expect(
      screen.getByRole('link', {
        hidden: true,
        name: /Saved videos/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_149:::SavedVideos Route should consist of an HTML paragraph element with text content starting with "CONTACT US" in the sidebar:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    const paragraphEl = screen.getByText(/^CONTACT US/i, {
      hidden: true,
      exact: false,
    })
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_150:::SavedVideos Route should consist of an HTML image element with alt attribute value as "facebook logo" and src as the value of the given facebook logo URL:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    const imageEl = screen.getByRole('img', {
      hidden: true,
      name: /facebook logo/i,
      exact: false,
    })
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(facebookLogo)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_151:::SavedVideos Route should consist of an HTML image element with alt attribute value as "twitter logo" and src as the value of the given twitter logo URL:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    const imageEl = screen.getByRole('img', {
      hidden: true,
      name: /twitter logo/i,
      exact: false,
    })
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(twitterLogo)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_152:::SavedVideos Route should consist of an HTML image element with alt attribute value as "linked in logo" and src as the value of the given linked in logo URL:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    const imageEl = screen.getByRole('img', {
      hidden: true,
      name: /linked in logo/i,
      exact: false,
    })
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(linkedInLogo)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_153:::SavedVideos Route should consist of an HTML paragraph element with text content starting with "Enjoy! Now to see your channels and recommendations!" in the sidebar:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    const paragraphEl = screen.getByText(
      /^Enjoy! Now to see your channels and recommendations!/i,
      {
        hidden: true,
        exact: false,
      },
    )
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_154:::When the "SavedVideosList" is empty, then the page should consist of the HTML image element with alt attribute value as "no saved videos" and src as the given "No Saved Videos view image URL" :::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    const imgEl = await screen.getByRole('img', {
      name: /no saved videos/i,
      exact: false,
    })
    expect(imgEl).toBeInTheDocument()
    expect(imgEl.src).toBe(emptySavedVideosImage)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_155:::When the "SavedVideosList" is empty, then the page should consist of an HTML main heading element with text content as "No saved videos found":::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    expect(
      screen.getByRole('heading', {name: /No saved videos found/i}),
    ).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_156:::When the "SavedVideosList" is empty, then the page should consist of an HTML paragraph element with text content as "Save your videos by clicking a button":::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    const paragraphEl = screen.getByText(
      /^You can save your videos while watching them/i,
      {
        exact: false,
      },
    )
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')

    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_157:::When a Video Item is saved, then the SavedVideos Route should consist of an HTML unordered list to display the list of video items:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: videoItemDetailRoutePath})

    expect(
      await screen.findByText(videoDetailsResponse.video_details.title, {
        exact: false,
      }),
    ).toBeInTheDocument()

    userEvent.click(
      screen.getByRole('button', {
        hidden: true,
        name: /Save/i,
        exact: false,
      }),
    )

    const savedVideosItem = screen.getByRole('link', {
      hidden: true,
      name: /Saved Videos/i,
      exact: false,
    })
    userEvent.click(savedVideosItem)

    expect(window.location.pathname).toBe(savedVideosRoutePath)

    expect(
      screen.getAllByText(videoDetailsResponse.video_details.title, {
        exact: false,
      })[0],
    ).toBeInTheDocument()

    const listItems = await screen.findAllByRole('list', {hidden: true})
    expect(listItems.length).toBeGreaterThanOrEqual(2)
    expect(listItems[0].tagName).toBe('UL')

    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_158:::When a Video Item is saved, then the SavedVideos Route should consist of an HTML main heading element with text content as "Saved Videos" should be displayed in the banner:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: videoItemDetailRoutePath})

    expect(
      await screen.findByText(videoDetailsResponse.video_details.title, {
        exact: false,
      }),
    ).toBeInTheDocument()

    userEvent.click(
      screen.getByRole('button', {
        name: /Save/i,
        exact: false,
      }),
    )

    const savedVideosItem = screen.getByRole('link', {
      hidden: true,
      name: /Saved Videos/i,
      exact: false,
    })
    userEvent.click(savedVideosItem)
    expect(window.location.pathname).toBe(savedVideosRoutePath)

    expect(
      screen.getByRole('heading', {name: /Saved Videos/i}),
    ).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_159:::When a Video Item is removed from the savedVideosList, then the respective video item details should not be displayed in the SavedVideos Route:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: videoItemDetailRoutePath})

    expect(
      await screen.findByText(videoDetailsResponse.video_details.title, {
        exact: false,
      }),
    ).toBeInTheDocument()

    userEvent.click(
      screen.getByRole('button', {
        name: /Save/i,
        exact: false,
      }),
    )

    const savedVideosItem = screen.getByRole('link', {
      hidden: true,
      name: /Saved Videos/i,
      exact: false,
    })
    userEvent.click(savedVideosItem)
    expect(window.location.pathname).toBe(savedVideosRoutePath)

    const videoTitleButton = screen.getAllByText(
      videoDetailsResponse.video_details.title,
      {
        exact: false,
      },
    )

    expect(videoTitleButton[0]).toBeInTheDocument()

    userEvent.click(videoTitleButton[0])

    expect(
      await screen.findByText(videoDetailsResponse.video_details.title, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(window.location.pathname).toBe(videoItemDetailRoutePath)

    userEvent.click(
      await screen.getByRole('button', {
        name: /Saved/i,
        exact: false,
      }),
    )

    const savedVideosItem2 = screen.getByRole('link', {
      hidden: true,
      name: /Saved Videos/i,
      exact: false,
    })
    userEvent.click(savedVideosItem2)
    expect(window.location.pathname).toBe(savedVideosRoutePath)

    expect(
      screen.queryByText(videoDetailsResponse.video_details.title, {
        exact: false,
      }),
    ).not.toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_160:::When a Video is added to the savedVideosList, then the page should consist of the HTML image element with alt attribute value as "video thumbnail" from the savedVideoDetailsResponse:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: videoItemDetailRoutePath})

    const videoDetailsTitle = await screen.findAllByText(
      videoDetailsResponse.video_details.title,
      {
        exact: false,
      },
    )

    expect(videoDetailsTitle[0]).toBeInTheDocument()

    userEvent.click(
      screen.getByRole('button', {
        name: /Save/i,
        exact: false,
      }),
    )

    const savedVideosItem = screen.getByRole('link', {
      hidden: true,
      name: /Saved Videos/i,
      exact: false,
    })
    userEvent.click(savedVideosItem)
    expect(window.location.pathname).toBe(savedVideosRoutePath)

    const imageEls = screen.getByRole('img', {
      name: /video thumbnail/i,
      exact: false,
    })

    expect(imageEls).toBeInTheDocument()
    expect(imageEls.src).toBe(videoDetailsResponse.video_details.thumbnail_url)

    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_161:::When a Video is added to the savedVideosList, then the page should consist of the HTML paragraph element with text content as the value of the key "title" from the savedVideoDetailsResponse:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: videoItemDetailRoutePath})

    expect(
      await screen.findByText(videoDetailsResponse.video_details.title, {
        exact: false,
      }),
    ).toBeInTheDocument()

    userEvent.click(
      screen.getByRole('button', {
        name: /Save/i,
        exact: false,
      }),
    )

    const savedVideosItem = screen.getByRole('link', {
      hidden: true,
      name: /Saved Videos/i,
      exact: false,
    })
    userEvent.click(savedVideosItem)
    expect(window.location.pathname).toBe(savedVideosRoutePath)

    expect(
      screen.getByText(videoDetailsResponse.video_details.title, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByText(videoDetailsResponse.video_details.title, {
        exact: false,
      }).tagName,
    ).toBe('P')

    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_162:::When a Video is added to the savedVideosList, then the page should consist of the HTML paragraph element with text content as the value of the key "name" in the channel inside from the savedVideoDetailsResponse:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: videoItemDetailRoutePath})

    expect(
      await screen.findByText(videoDetailsResponse.video_details.title, {
        exact: false,
      }),
    ).toBeInTheDocument()

    userEvent.click(
      screen.getByRole('button', {
        name: /Save/i,
        exact: false,
      }),
    )

    const savedVideosItem = screen.getByRole('link', {
      hidden: true,
      name: /Saved Videos/i,
      exact: false,
    })
    userEvent.click(savedVideosItem)
    expect(window.location.pathname).toBe(savedVideosRoutePath)

    expect(
      screen.getByText(videoDetailsResponse.video_details.channel.name, {
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByText(videoDetailsResponse.video_details.channel.name, {
        exact: false,
      }).tagName,
    ).toBe('P')

    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_163:::When a Video is added to the savedVideosList, then the page should consist of the HTML paragraph element with text content as the value of the key "view_count" from the savedVideoDetailsResponse:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: videoItemDetailRoutePath})

    expect(
      await screen.findByText(videoDetailsResponse.video_details.title, {
        exact: false,
      }),
    ).toBeInTheDocument()

    userEvent.click(
      screen.getByRole('button', {
        name: /Save/i,
        exact: false,
      }),
    )

    const savedVideosItem = screen.getByRole('link', {
      hidden: true,
      name: /Saved Videos/i,
      exact: false,
    })
    userEvent.click(savedVideosItem)
    expect(window.location.pathname).toBe(savedVideosRoutePath)

    expect(
      screen.getByText(videoDetailsResponse.video_details.view_count, {
        exact: false,
      }),
    ).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_164:::When a Video is added to the savedVideosList, then the page should consist of the HTML paragraph element with text content as the value of the key "published_at" from the savedVideoDetailsResponse:::5:::', async () => {
    mockGetCookie()

    const dateFormatDistance = dateString => {
      const formatDistanceDate = formatDistanceStrict(
        new Date(dateString),
        new Date(),
      )
      return formatDistanceDate
    }

    const date1 = 'Oct 7, 2019'

    const formattedDate1 = dateFormatDistance(date1)

    renderWithBrowserRouter(<App />, {route: videoItemDetailRoutePath})

    expect(
      await screen.findByText(videoDetailsResponse.video_details.title, {
        exact: false,
      }),
    ).toBeInTheDocument()

    userEvent.click(
      screen.getByRole('button', {
        name: /Save/i,
        exact: false,
      }),
    )

    const savedVideosItem = screen.getByRole('link', {
      hidden: true,
      name: /Saved Videos/i,
      exact: false,
    })
    userEvent.click(savedVideosItem)
    expect(window.location.pathname).toBe(savedVideosRoutePath)

    const storeAwaitFunction = await screen.findByText(
      new RegExp(`${date1}|${formattedDate1}`),
      {
        exact: false,
      },
    )

    expect(storeAwaitFunction).toBeInTheDocument()
    expect(storeAwaitFunction.tagName).toBe('P')

    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_165:::When a Video Item is clicked in the savedVideosList, then the page should be navigated to the Video Item Details route with "/videos/:id" in the URL path :::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: videoItemDetailRoutePath})

    expect(
      await screen.findByText(videoDetailsResponse.video_details.title, {
        exact: false,
      }),
    ).toBeInTheDocument()

    userEvent.click(
      screen.getByRole('button', {
        name: /Save/i,
        exact: false,
      }),
    )

    const savedVideosItem = screen.getByRole('link', {
      hidden: true,
      name: /Saved Videos/i,
      exact: false,
    })
    userEvent.click(savedVideosItem)

    expect(window.location.pathname).toBe(savedVideosRoutePath)

    const videoTitleButton = screen.getByText(
      videoDetailsResponse.video_details.title,
      {
        exact: false,
      },
    )

    expect(videoTitleButton).toBeInTheDocument()

    userEvent.click(videoTitleButton)

    await waitFor(() =>
      expect(window.location.pathname).toBe(videoItemDetailRoutePath),
    )

    restoreGetCookieFns()
  })

  // #endregion
})
