import {setupServer} from 'msw/node'
import {rest} from 'msw'
import {createMemoryHistory} from 'history'
import {Router, BrowserRouter} from 'react-router-dom'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const teamsListResponse = {
  teams: [
    {
      name: 'Royal Challengers Bangalore',
      id: 'RCB',
      team_image_url:
        'https://assets.ccbp.in/frontend/react-js/rcb-logo-img.png',
    },
    {
      name: 'Kolkata Knight Riders',
      id: 'KKR',
      team_image_url:
        'https://assets.ccbp.in/frontend/react-js/kkr-logo-img.png',
    },
    {
      name: 'Kings XI Punjab',
      id: 'KXP',
      team_image_url:
        'https://assets.ccbp.in/frontend/react-js/kxp-logo-img.png',
    },
    {
      name: 'Chennai Super Kings',
      id: 'CSK',
      team_image_url:
        'https://assets.ccbp.in/frontend/react-js/csk-logo-img.png',
    },
    {
      name: 'Rajasthan Royals',
      id: 'RR',
      team_image_url:
        'https://assets.ccbp.in/frontend/react-js/rr-logo-img.png',
    },
    {
      name: 'Mumbai Indians',
      id: 'MI',
      team_image_url:
        'https://assets.ccbp.in/frontend/react-js/mi-logo-img.png',
    },
    {
      name: 'Sunrisers Hyderabad',
      id: 'SH',
      team_image_url:
        'https://assets.ccbp.in/frontend/react-js/srh-logo-img.png',
    },
    {
      name: 'Delhi Capitals',
      id: 'DC',
      team_image_url:
        'https://assets.ccbp.in/frontend/react-js/dc-logo-img.png',
    },
  ],
}

const recentMatchesResponse = {
  team_banner_url: 'https://assets.ccbp.in/frontend/react-js/kkr-team-img.png',
  latest_match_details: {
    umpires: 'CB Gaffaney, VK Sharma',
    result: 'Kolkata Knight Riders Won by 7 wickets',
    man_of_the_match: 'Shubman Gill',
    id: '1216545',
    date: '2020-09-26',
    venue: 'At Sheikh Zayed Stadium, Abu Dhabi',
    competing_team: 'Sunrisers Hyderabad',
    competing_team_logo:
      'https://upload.wikimedia.org/wikipedia/en/thumb/8/81/Sunrisers_Hyderabad.svg/1200px-Sunrisers_Hyderabad.svg.png',
    first_innings: 'Sunrisers Hyderabad',
    second_innings: 'Kolkata Knight Riders',
    match_status: 'Won',
  },
  recent_matches: [
    {
      umpires: 'RK Illingworth, K Srinivasan',
      result: 'Royal Challengers Bangalore Won by 82 runs',
      man_of_the_match: 'AB de Villiers',
      id: '1216540',
      date: '2020-10-12',
      venue: 'At Sharjah Cricket Stadium, Sharjah',
      competing_team: 'Royal Challengers Bangalore',
      competing_team_logo:
        'https://upload.wikimedia.org/wikipedia/en/thumb/2/2a/Royal_Challengers_Bangalore_2020.svg/1200px-Royal_Challengers_Bangalore_2020.svg.png',
      first_innings: 'Royal Challengers Bangalore',
      second_innings: 'Kolkata Knight Riders',
      match_status: 'Lost',
    },
    {
      umpires: 'C Shamshuddin, RK Illingworth',
      result: 'Chennai Super Kings Won by 6 wickets',
      man_of_the_match: 'RD Gaikwad',
      id: '1216536',
      date: '2020-10-29',
      venue: 'At Dubai International Cricket Stadium, Dubai',
      competing_team: 'Chennai Super Kings',
      competing_team_logo:
        'https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Chennai_Super_Kings_Logo.svg/1200px-Chennai_Super_Kings_Logo.svg.png',
      first_innings: 'Kolkata Knight Riders',
      second_innings: 'Chennai Super Kings',
      match_status: 'Lost',
    },
    {
      umpires: 'Nitin Menon, PR Reiffel',
      result: 'Kolkata Knight Riders Won by 60 runs',
      man_of_the_match: 'PJ Cummins',
      id: '1216530',
      date: '2020-11-01',
      venue: 'At Dubai International Cricket Stadium, Dubai',
      competing_team: 'Rajasthan Royals',
      competing_team_logo:
        'https://www.rajasthanroyals.com/assets/images/RR_blue%20(1).png',
      first_innings: 'Kolkata Knight Riders',
      second_innings: 'Rajasthan Royals',
      match_status: 'Won',
    },
  ],
}

const iplLogo = 'https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png'

const teamsApiUrl = 'https://apis.ccbp.in/ipl'

const teamMatchesApiUrl = 'https://apis.ccbp.in/ipl/KKR'

const server = setupServer(
  rest.get(teamMatchesApiUrl, (req, res, ctx) =>
    res(ctx.json(recentMatchesResponse)),
  ),
  rest.get(teamsApiUrl, (req, res, ctx) => res(ctx.json(teamsListResponse))),
)

const renderWithBrowserRouter = (ui = <App />, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

const rtlRender = (ui = <App />, path = '/') => {
  const history = createMemoryHistory()
  history.push(path)
  render(<Router history={history}>{ui}</Router>)
  return {
    history,
  }
}

const originalConsoleError = console.error

describe(':::RJSCP9EFN6_TEST_SUITE_1:::Home Route tests', () => {
  beforeAll(() => {
    server.listen()
  })
  afterEach(() => {
    server.resetHandlers()
    console.error = originalConsoleError
  })
  afterAll(() => {
    server.close()
  })

  it(':::RJSCP9EFN6_TEST_1:::Page should consist of at least two HTML list items and the teams list received in the response should be rendered using a unique key as a prop for each team card item:::5:::', async () => {
    console.error = message => {
      if (
        /Each child in a list should have a unique "key" prop/.test(message) ||
        /Encountered two children with the same key/.test(message)
      ) {
        throw new Error(message)
      }
    }

    renderWithBrowserRouter()
    expect(
      await screen.findByText(teamsListResponse.teams[0].name),
    ).toBeInTheDocument()

    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(2)
  })

  it(':::RJSCP9EFN6_TEST_2:::Home Route should consist of an HTML main heading element with text content as "IPL Dashboard":::5:::', async () => {
    renderWithBrowserRouter()
    expect(
      await screen.findByText(teamsListResponse.teams[0].name),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', {name: /IPL Dashboard/i, exact: false}),
    ).toBeInTheDocument()
  })

  it(':::RJSCP9EFN6_TEST_3:::Home Route should consist of an HTML image element with alt attribute value as "ipl logo" and src attribute value as the URL for IPL Logo image:::5:::', async () => {
    renderWithBrowserRouter()
    expect(
      await screen.findByText(teamsListResponse.teams[0].name),
    ).toBeInTheDocument()

    const iplLogoImg = screen.getByRole('img', {
      name: /ipl logo/i,
      exact: false,
    })
    expect(iplLogoImg).toBeInTheDocument()
    expect(iplLogoImg.src).toBe(iplLogo)
  })

  it(':::RJSCP9EFN6_TEST_4:::When the Home Route is opened, it should initially consist of an HTML container element with testid attribute value as "loader":::5:::', async () => {
    renderWithBrowserRouter()
    await waitForElementToBeRemoved(() => screen.queryByTestId('loader'))
  })

  it(':::RJSCP9EFN6_TEST_5:::When the Home Route is opened, an HTTP GET request should be made to the given teamsApiUrl to get the list of IPL teams:::5:::', async () => {
    const originalFetch = window.fetch
    const mockFetchFunction = jest.fn().mockImplementation(() => ({
      json: () => Promise.resolve(teamsListResponse),
    }))
    window.fetch = mockFetchFunction

    renderWithBrowserRouter()

    expect(mockFetchFunction).toHaveBeenCalledWith(teamsApiUrl)
    window.fetch = originalFetch
    expect(
      await screen.findByText(teamsListResponse.teams[0].name),
    ).toBeInTheDocument()
  })

  it(':::RJSCP9EFN6_TEST_6:::When the HTTP GET request made in Home Route is successful, then the page should consist of HTML paragraph elements with text content equal to the "name" in teams received in the response:::5:::', async () => {
    renderWithBrowserRouter()
    expect(
      await screen.findByText(teamsListResponse.teams[0].name),
    ).toBeInTheDocument()

    const {teams} = teamsListResponse
    const firstTeamNameEl = screen.getByText(teams[0].name, {exact: false})
    const secondTeamNameEl = screen.getByText(teams[1].name, {exact: false})
    const thirdTeamNameEl = screen.getByText(teams[2].name, {exact: false})
    const fourthTeamNameEl = screen.getByText(teams[3].name, {exact: false})
    const fifthTeamNameEl = screen.getByText(teams[4].name, {exact: false})
    const sixthTeamNameEl = screen.getByText(teams[5].name, {exact: false})
    const seventhTeamNameEl = screen.getByText(teams[6].name, {exact: false})
    const eighthTeamNameEl = screen.getByText(teams[7].name, {exact: false})

    expect(firstTeamNameEl).toBeInTheDocument()
    expect(firstTeamNameEl.tagName).toBe('P')

    expect(secondTeamNameEl).toBeInTheDocument()
    expect(secondTeamNameEl.tagName).toBe('P')

    expect(thirdTeamNameEl).toBeInTheDocument()
    expect(thirdTeamNameEl.tagName).toBe('P')

    expect(fourthTeamNameEl).toBeInTheDocument()
    expect(fourthTeamNameEl.tagName).toBe('P')

    expect(fifthTeamNameEl).toBeInTheDocument()
    expect(fifthTeamNameEl.tagName).toBe('P')

    expect(sixthTeamNameEl).toBeInTheDocument()
    expect(sixthTeamNameEl.tagName).toBe('P')

    expect(seventhTeamNameEl).toBeInTheDocument()
    expect(seventhTeamNameEl.tagName).toBe('P')

    expect(eighthTeamNameEl).toBeInTheDocument()
    expect(eighthTeamNameEl.tagName).toBe('P')
  })

  it(':::RJSCP9EFN6_TEST_7:::When the HTTP GET request made in Home Route is successful, then the page should consist of HTML image elements with alt and src values equal to the "name" and "team_image_url" in teams received in the response:::5:::', async () => {
    renderWithBrowserRouter()
    expect(
      await screen.findByText(teamsListResponse.teams[0].name),
    ).toBeInTheDocument()

    const {teams} = teamsListResponse
    const firstTeamLogo = screen.getByRole('img', {
      name: teams[0].name,
      exact: false,
    })
    const secondTeamLogo = screen.getByRole('img', {
      name: teams[1].name,
      exact: false,
    })
    const thirdTeamLogo = screen.getByRole('img', {
      name: teams[2].name,
      exact: false,
    })
    const fourthTeamLogo = screen.getByRole('img', {
      name: teams[3].name,
      exact: false,
    })
    const fifthTeamLogo = screen.getByRole('img', {
      name: teams[4].name,
      exact: false,
    })
    const sixthTeamLogo = screen.getByRole('img', {
      name: teams[5].name,
      exact: false,
    })
    const seventhTeamLogo = screen.getByRole('img', {
      name: teams[6].name,
      exact: false,
    })
    const eighthTeamLogo = screen.getByRole('img', {
      name: teams[7].name,
      exact: false,
    })
    expect(firstTeamLogo).toBeInTheDocument()
    expect(firstTeamLogo.src).toBe(teams[0].team_image_url)
    expect(secondTeamLogo).toBeInTheDocument()
    expect(secondTeamLogo.src).toBe(teams[1].team_image_url)
    expect(thirdTeamLogo).toBeInTheDocument()
    expect(thirdTeamLogo.src).toBe(teams[2].team_image_url)
    expect(fourthTeamLogo).toBeInTheDocument()
    expect(fourthTeamLogo.src).toBe(teams[3].team_image_url)
    expect(fifthTeamLogo).toBeInTheDocument()
    expect(fifthTeamLogo.src).toBe(teams[4].team_image_url)
    expect(sixthTeamLogo).toBeInTheDocument()
    expect(sixthTeamLogo.src).toBe(teams[5].team_image_url)
    expect(seventhTeamLogo).toBeInTheDocument()
    expect(seventhTeamLogo.src).toBe(teams[6].team_image_url)
    expect(eighthTeamLogo).toBeInTheDocument()
    expect(eighthTeamLogo.src).toBe(teams[7].team_image_url)
  })

  it(':::RJSCP9EFN6_TEST_8:::When a team card is clicked in Home Route, then the page should be navigated to the Team Matches Route with "/team-matches/:id" in the URL:::5:::', async () => {
    const {history} = rtlRender()

    const teamEl = await screen.findByText(teamsListResponse.teams[1].name)

    userEvent.click(teamEl)
    expect(history.location.pathname).toBe('/team-matches/KKR')
  })

  it(':::RJSCP9EFN6_TEST_9:::When a "/bad-path" is provided in the URL, then the page should be navigated to Not Found Route and consist of an HTML heading element with text content as "Page Not Found":::5:::', async () => {
    renderWithBrowserRouter(<App />, {route: '/recent-matches/KKR'})

    expect(
      await screen.findByRole('heading', {
        name: /Page Not Found/i,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCP9EFN6_TEST_10:::Page should consist of at least eight team cards wrapped with the Link from react-router-dom:::5:::', async () => {
    renderWithBrowserRouter()
    expect(
      await screen.findByText(teamsListResponse.teams[1].name),
    ).toBeInTheDocument()

    expect(screen.getAllByRole('link').length).toBeGreaterThanOrEqual(8)
  })
})
