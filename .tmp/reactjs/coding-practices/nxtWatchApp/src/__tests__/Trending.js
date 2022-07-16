import 'jest-styled-components'
import {BrowserRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {formatDistanceStrict} from 'date-fns'

import {rest} from 'msw'
import {setupServer} from 'msw/node'

import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'

import App from '../App'

const websiteLogo =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
const profilePicImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png'

const facebookLogo =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png'
const twitterLogo =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png'
const linkedInLogo =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png'

const loginRoutePath = '/login'
const trendingRoutePath = '/trending'

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

const renderWithBrowserRouter = (ui, {route = '/trending'} = {}) => {
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
    res(ctx.json(videosResponse)),
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

describe(':::RJSCPYQN94_TEST_SUITE_11:::Trending Route UI tests', () => {
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

  it(':::RJSCPYQN94_TEST_180:::Page should consist of at least two HTML list items and the navItemsList, videosList received from the response should be rendered using a unique key as a prop for each nav item and video item respectively :::5:::', async () => {
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
      await screen.findByText(videosResponse.videos[0].title, {exact: false}),
    ).toBeInTheDocument()

    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(2)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_181:::When "/trending" is provided as the URL by an unauthenticated user, then the page should be navigated to Login Route:::5:::', () => {
    mockGetCookie(false)
    renderWithBrowserRouter(<App />)
    expect(window.location.pathname).toBe(loginRoutePath)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_182:::When "/trending" is provided as the URL by an authenticated user, then the page should be navigated to Trending Route:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    expect(
      await screen.findByText(videosResponse.videos[0].title, {exact: false}),
    ).toBeInTheDocument()
    expect(window.location.pathname).toBe(trendingRoutePath)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_183:::Trending Route should consist of an HTML image element in the Header with alt attribute value as "website logo" and src as given logo URL:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByText(videosResponse.videos[0].title, {exact: false}),
    ).toBeInTheDocument()
    const imageEls = screen.getAllByRole('img', {
      name: /website logo/i,
      exact: false,
    })
    expect(imageEls[0]).toBeInTheDocument()
    expect(imageEls[0].src).toBe(websiteLogo)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_184:::Trending Route should consist of an HTML image element in the Header with alt attribute value as "website logo" and src as the given logo URL is wrapped with Link from react-router-dom:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByText(videosResponse.videos[0].title, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getAllByRole('link', {
        name: /website logo/,
        exact: false,
      })[0],
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_185:::Trending Route should consist of an HTML button element with data-testid attribute value as "theme" in the Header:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByText(videosResponse.videos[0].title, {exact: false}),
    ).toBeInTheDocument()

    const themeButton = await screen.getAllByTestId('theme')

    expect(themeButton[0]).toBeInTheDocument()
    expect(themeButton[0].tagName).toBe('BUTTON')
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_186:::Trending Route should consist of an HTML image element in the Header with alt attribute value as "profile" and src as the value of given profile image URL:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByText(videosResponse.videos[0].title, {exact: false}),
    ).toBeInTheDocument()
    const imageEls = screen.getByRole('img', {
      hidden: true,
      name: /profile/i,
      exact: false,
    })
    expect(imageEls).toBeInTheDocument()
    expect(imageEls.src).toBe(profilePicImage)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_187:::Trending Route should consist of an HTML button element with text content as "Logout" in the Header:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByText(videosResponse.videos[0].title, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        hidden: true,
        name: /Logout/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_188:::Trending Route should consist of at least two HTML unordered list elements navItemsList, videosList received from the response to display nav items and video items:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByText(videosResponse.videos[0].title, {exact: false}),
    ).toBeInTheDocument()
    const listItems = await screen.findAllByRole('list', {hidden: true})
    expect(listItems.length).toBeGreaterThanOrEqual(2)
    expect(listItems[0].tagName).toBe('UL')
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_189:::Trending Route should consists of "Home" text wrapped with Link from react-router-dom:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    expect(
      await screen.findByText(videosResponse.videos[0].title, {exact: false}),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('link', {
        hidden: true,
        name: /Home/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_190:::Trending Route should consists of "Trending" text wrapped with Link from react-router-dom:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    expect(
      await screen.findByText(videosResponse.videos[0].title, {exact: false}),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('link', {
        hidden: true,
        name: /Trending/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_191:::Trending Route should consists of "Gaming" text wrapped with Link from react-router-dom:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    expect(
      await screen.findByText(videosResponse.videos[0].title, {exact: false}),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('link', {
        hidden: true,
        name: /Gaming/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_192:::Trending Route should consists of "Saved videos" text wrapped with Link from react-router-dom:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    expect(
      await screen.findByText(videosResponse.videos[0].title, {exact: false}),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('link', {
        hidden: true,
        name: /Saved videos/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_193:::Trending Route should consist of an HTML paragraph element with text content starting with "CONTACT US" in the sidebar:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    expect(
      await screen.findByText(videosResponse.videos[0].title, {exact: false}),
    ).toBeInTheDocument()

    const paragraphEl = screen.getByText(/^CONTACT US/i, {
      hidden: true,
      exact: false,
    })
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_194:::Trending Route should consist of an HTML image element with alt attribute value as "facebook logo" and src as the value of the given facebook logo URL:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    expect(
      await screen.findByText(videosResponse.videos[0].title, {exact: false}),
    ).toBeInTheDocument()

    const imageEl = screen.getByRole('img', {
      hidden: true,
      name: /facebook logo/i,
      exact: false,
    })
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(facebookLogo)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_195:::Trending Route should consist of an HTML image element with alt attribute value as "twitter logo" and src as the value of the given twitter logo URL:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    expect(
      await screen.findByText(videosResponse.videos[0].title, {exact: false}),
    ).toBeInTheDocument()

    const imageEl = screen.getByRole('img', {
      hidden: true,
      name: /twitter logo/i,
      exact: false,
    })
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(twitterLogo)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_196:::Trending Route should consist of an HTML image element with alt attribute value as "linked in logo" and src as the value of the given linked in logo URL:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    expect(
      await screen.findByText(videosResponse.videos[0].title, {exact: false}),
    ).toBeInTheDocument()

    const imageEl = screen.getByRole('img', {
      hidden: true,
      name: /linked in logo/i,
      exact: false,
    })
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(linkedInLogo)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_197:::Trending Route should consist of an HTML paragraph element with text content starting with "Enjoy! Now to see your channels and recommendations!" in the sidebar:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    expect(
      await screen.findByText(videosResponse.videos[0].title, {exact: false}),
    ).toBeInTheDocument()

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

  it(':::RJSCPYQN94_TEST_198:::Trending Route should consist of an HTML main heading element with text content as "Trending":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    expect(
      await screen.findByText(videosResponse.videos[0].title, {exact: false}),
    ).toBeInTheDocument()

    expect(screen.getByRole('heading', {name: /Trending/i})).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_199:::When the Trending Route is opened, an HTTP GET request should be made to trendingVideosApiUrl:::5:::', async () => {
    mockGetCookie()
    const mockFetchFunction = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(videosResponse),
    }))
    window.fetch = mockFetchFunction
    renderWithBrowserRouter(<App />)
    expect(
      await screen.findByText(videosResponse.videos[0].title, {exact: false}),
    ).toBeInTheDocument()

    expect(mockFetchFunction.mock.calls[0][0]).toMatch(
      `${trendingVideosApiUrl}`,
    )
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_200:::When the Trending Route is opened, an HTML container element with data-testid attribute value as "loader" should be displayed while the HTTP GET request is in progress:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    await waitForElementToBeRemoved(() => screen.queryAllByTestId('loader'))

    expect(
      await screen.findByText(videosResponse.videos[0].title, {exact: false}),
    ).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_201:::When the HTTP GET request in the Trending Route is successful, then the page should consist of the HTML image elements with alt attribute value as "video thumbnail" and src equal to the value of the key "thumbnail_url" in each item from the videosResponse:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    const imageEls = await screen.findAllByRole('img', {
      hidden: true,
      name: /video thumbnail/i,
      exact: false,
    })

    expect(imageEls[0]).toBeInTheDocument()
    expect(imageEls[0].src).toBe(videosResponse.videos[0].thumbnail_url)

    expect(imageEls[1]).toBeInTheDocument()
    expect(imageEls[1].src).toBe(videosResponse.videos[1].thumbnail_url)

    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_202:::When the HTTP GET request in the Trending Route is successful, then the page should consist of the HTML Paragraph elements with text content as the value of the key "title" in each item from the videosResponse:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)

    const storeAwaitFunction = await screen.findByText(
      videosResponse.videos[0].title,
      {exact: false},
    )
    expect(storeAwaitFunction).toBeInTheDocument()
    expect(storeAwaitFunction.tagName).toBe('P')

    const storeAwaitFunction2 = await screen.findByText(
      videosResponse.videos[1].title,
      {exact: false},
    )
    expect(storeAwaitFunction2).toBeInTheDocument()
    expect(storeAwaitFunction2.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_203:::When the HTTP GET request in the Trending Route is successful, then the page should consist of the HTML Paragraph elements with text content as the value of the key "name" in each item from the videosResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const storeAwaitFunction = await screen.findByText(
      videosResponse.videos[0].channel.name,
      {
        exact: false,
      },
    )
    expect(storeAwaitFunction).toBeInTheDocument()

    expect(storeAwaitFunction.tagName).toBe('P')

    const storeAwaitFunction2 = await screen.findByText(
      videosResponse.videos[1].channel.name,
      {
        exact: false,
      },
    )

    expect(storeAwaitFunction2).toBeInTheDocument()
    expect(storeAwaitFunction2.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_204:::When the HTTP GET request in the Trending Route is successful, then the page should consist of the HTML Paragraph elements with text content as the value of the key "view_count" in each item from the videosResponse:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter(<App />)

    const storeAwaitFunction = await screen.findByText(
      videosResponse.videos[0].view_count,
      {
        exact: false,
      },
    )
    expect(storeAwaitFunction).toBeInTheDocument()

    expect(storeAwaitFunction.tagName).toBe('P')

    const storeAwaitFunction2 = await screen.findByText(
      videosResponse.videos[1].view_count,
      {
        exact: false,
      },
    )

    expect(storeAwaitFunction2).toBeInTheDocument()
    expect(storeAwaitFunction2.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_205:::When the HTTP GET request in the Trending Route is successful, then the page should consist of the HTML Paragraph elements with text content as the value of the key "published_at" in each item from the videosResponse:::5:::', async () => {
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

    const date2 = 'Aug 21, 2021'

    const formattedDate2 = dateFormatDistance(date2)

    renderWithBrowserRouter(<App />)

    const storeAwaitFunction = await screen.findByText(
      new RegExp(`${date1}|${formattedDate1}`),
      {
        exact: false,
      },
    )
    expect(storeAwaitFunction).toBeInTheDocument()
    expect(storeAwaitFunction.tagName).toBe('P')

    const storeAwaitFunction2 = screen.getByText(
      new RegExp(`${date2}|${formattedDate2}`),
      {
        exact: false,
      },
    )

    expect(storeAwaitFunction2).toBeInTheDocument()
    expect(storeAwaitFunction2.tagName).toBe('P')

    restoreGetCookieFns()
  })

  // #endregion
})
