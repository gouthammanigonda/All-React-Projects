import {setupServer} from 'msw/node'
import {rest} from 'msw'
import {createMemoryHistory} from 'history'
import {BrowserRouter, Router} from 'react-router-dom'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const teamsListResponse = {
  teams: [
    {
      name: 'Royal Challengers Bangalore',
      id: 'RCB',
      team_image_url:
        'https://upload.wikimedia.org/wikipedia/en/thumb/2/2a/Royal_Challengers_Bangalore_2020.svg/1200px-Royal_Challengers_Bangalore_2020.svg.png',
    },
    {
      name: 'Kolkata Knight Riders',
      id: 'KKR',
      team_image_url:
        'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Kolkata_Knight_Riders_Logo.svg/1200px-Kolkata_Knight_Riders_Logo.svg.png',
    },
    {
      name: 'Kings XI Punjab',
      id: 'KXP',
      team_image_url:
        'https://i2.wp.com/orissadiary.com/wp-content/uploads/2021/02/oie_17102022UPRrIyFT.jpg?fit=500%2C500&ssl=1',
    },
    {
      name: 'Chennai Super Kings',
      id: 'CSK',
      team_image_url:
        'https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Chennai_Super_Kings_Logo.svg/1200px-Chennai_Super_Kings_Logo.svg.png',
    },
    {
      name: 'Rajasthan Royals',
      id: 'RR',
      team_image_url:
        'https://www.rajasthanroyals.com/assets/images/RR_blue%20(1).png',
    },
    {
      name: 'Mumbai Indians',
      id: 'MI',
      team_image_url:
        'https://i.pinimg.com/originals/28/09/a8/2809a841bb08827603ccac5c6aee8b33.png',
    },
    {
      name: 'Sunrisers Hyderabad',
      id: 'SH',
      team_image_url:
        'https://upload.wikimedia.org/wikipedia/en/thumb/8/81/Sunrisers_Hyderabad.svg/1200px-Sunrisers_Hyderabad.svg.png',
    },
    {
      name: 'Delhi Capitals',
      id: 'DC',
      team_image_url:
        'https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/Delhi_Capitals_Logo.svg/1200px-Delhi_Capitals_Logo.svg.png',
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
    first_innings: 'Random Team Name',
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
      match_status: 'Loser',
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
      match_status: 'Loser',
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
      match_status: 'Winner',
    },
  ],
}

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

describe(':::RJSCP9EFN6_TEST_SUITE_2:::Team Matches Route tests', () => {
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

  it(':::RJSCP9EFN6_TEST_11:::Page should consist of at least two HTML list items and the recent matches list received in the response should be rendered using a unique key as a prop for each recent match:::5:::', async () => {
    console.error = message => {
      if (
        /Each child in a list should have a unique "key" prop/.test(message) ||
        /Encountered two children with the same key/.test(message)
      ) {
        throw new Error(message)
      }
    }

    renderWithBrowserRouter(<App />, {route: '/team-matches/KKR'})

    expect(
      await screen.findByText(
        recentMatchesResponse.latest_match_details.umpires,
      ),
    ).toBeInTheDocument()

    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(2)
  })

  it(':::RJSCP9EFN6_TEST_12:::When the HTTP GET request made in Team Matches Route is successful, then the page should consist of an HTML paragraph element with text content equal to the "umpires" in latest match details received in the response:::5:::', async () => {
    renderWithBrowserRouter(<App />, {route: '/team-matches/KKR'})
    const {latest_match_details} = recentMatchesResponse

    const umpiresEl = await screen.findByText(latest_match_details.umpires)

    expect(umpiresEl).toBeInTheDocument()
    expect(umpiresEl.tagName).toBe('P')
  })

  it(':::RJSCP9EFN6_TEST_13:::When the Team Matches Route is opened, it should initially contain an HTML container element with testid attribute value as "loader":::5:::', async () => {
    renderWithBrowserRouter(<App />, {route: '/team-matches/KKR'})
    await waitForElementToBeRemoved(() => screen.queryByTestId('loader'))
  })

  it(':::RJSCP9EFN6_TEST_14:::When the Team Matches Route is opened, an HTTP GET request should be made to the given teamMatchesApiUrl to get recent matches based on the team selected:::5:::', async () => {
    const originalFetch = window.fetch
    const mockFetchFunction = jest.fn().mockImplementation(() => ({
      json: () => Promise.resolve(recentMatchesResponse),
    }))
    window.fetch = mockFetchFunction
    renderWithBrowserRouter(<App />, {route: '/team-matches/KKR'})

    expect(window.fetch).toBeCalledWith(teamMatchesApiUrl)
    window.fetch = originalFetch
    expect(
      await screen.findByText(
        recentMatchesResponse.latest_match_details.umpires,
      ),
    ).toBeInTheDocument()
  })

  it(':::RJSCP9EFN6_TEST_15:::When the HTTP GET request made in Team Matches Route is successful, then the page should consist of an HTML image element with alt as "team banner" and src value equal to the "team_banner_url" received in the response:::5:::', async () => {
    renderWithBrowserRouter(<App />, {route: '/team-matches/KKR'})

    expect(
      await screen.findByRole('img', {
        name: /team banner/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    const bannerImg = screen.getByRole('img', {
      name: /team banner/i,
      exact: false,
    })
    expect(bannerImg).toBeInTheDocument()
    expect(bannerImg.src).toBe(recentMatchesResponse.team_banner_url)
  })

  it(':::RJSCP9EFN6_TEST_16:::When the HTTP GET request made in Team Matches Route is successful, then the page should consist of an HTML paragraph element with text content equal to the "competing_team" in latest match details received in the response:::5:::', async () => {
    renderWithBrowserRouter(<App />, {route: '/team-matches/KKR'})
    const {latest_match_details} = recentMatchesResponse

    const competingTeamNameEl = await screen.findByText(
      latest_match_details.competing_team,
    )
    expect(competingTeamNameEl).toBeInTheDocument()
    expect(competingTeamNameEl.tagName).toBe('P')
  })

  it(':::RJSCP9EFN6_TEST_17:::When the HTTP GET request made in Team Matches Route is successful, then the page should consist of an HTML paragraph element with text content equal to the "date" in latest match details received in the response:::5:::', async () => {
    renderWithBrowserRouter(<App />, {route: '/team-matches/KKR'})
    const {latest_match_details} = recentMatchesResponse

    const matchDateEl = await screen.findByText(latest_match_details.date, {
      exact: false,
    })
    expect(matchDateEl).toBeInTheDocument()
    expect(matchDateEl.tagName).toBe('P')
  })

  it(':::RJSCP9EFN6_TEST_18:::When the HTTP GET request made in Team Matches Route is successful, then the page should consist of an HTML paragraph element with text content equal to the "venue" in latest match details received in the response:::5:::', async () => {
    renderWithBrowserRouter(<App />, {route: '/team-matches/KKR'})
    const {latest_match_details} = recentMatchesResponse

    const matchVenueEl = await screen.findByText(latest_match_details.venue, {
      exact: false,
    })
    expect(matchVenueEl).toBeInTheDocument()
    expect(matchVenueEl.tagName).toBe('P')
  })

  it(':::RJSCP9EFN6_TEST_19:::When the HTTP GET request made in Team Matches Route is successful, then the page should consist of an HTML paragraph element with text content equal to the "result" in latest match details received in the response:::5:::', async () => {
    renderWithBrowserRouter(<App />, {route: '/team-matches/KKR'})
    const {latest_match_details} = recentMatchesResponse

    const matchResultEl = await screen.findByText(latest_match_details.result, {
      exact: false,
    })
    expect(matchResultEl).toBeInTheDocument()
    expect(matchResultEl.tagName).toBe('P')
  })

  it(':::RJSCP9EFN6_TEST_20:::When the HTTP GET request made in Team Matches Route is successful, then the page should consist of HTML image element with alt value as "latest match {competing_team}" and src value equal to the "competing_team_logo" in latest match details received in response:::5:::', async () => {
    renderWithBrowserRouter(<App />, {route: '/team-matches/KKR'})
    const {latest_match_details} = recentMatchesResponse

    const imageEl = await screen.findByRole('img', {
      name: new RegExp(
        'latest match ' + latest_match_details.competing_team,
        'i',
      ),
      exact: false,
    })
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(latest_match_details.competing_team_logo)
  })

  it(':::RJSCP9EFN6_TEST_21:::When the HTTP GET request made in Team Matches Route is successful, then the page should consist of HTML paragraph element with text content equal to the "first_innings" in latest match details received in the response:::5:::', async () => {
    renderWithBrowserRouter(<App />, {route: '/team-matches/KKR'})
    const {latest_match_details} = recentMatchesResponse

    const matchFirstInningsEl = await screen.findByText(
      latest_match_details.first_innings,
    )
    expect(matchFirstInningsEl).toBeInTheDocument()
    expect(matchFirstInningsEl.tagName).toBe('P')
  })

  it(':::RJSCP9EFN6_TEST_22:::When the HTTP GET request made in Team Matches Route is successful, then the page should consist of an HTML paragraph element with text content equal to the "second_innings" in latest match details received in the response :::5:::', async () => {
    renderWithBrowserRouter(<App />, {route: '/team-matches/KKR'})
    const {latest_match_details} = recentMatchesResponse

    const matchSecondInningsEl = await screen.findByText(
      latest_match_details.second_innings,
    )
    expect(matchSecondInningsEl).toBeInTheDocument()
    expect(matchSecondInningsEl.tagName).toBe('P')
  })

  it(':::RJSCP9EFN6_TEST_23:::When the HTTP GET request made in Team Matches Route is successful, then the page should consist of an HTML paragraph element with text content equal to the "man_of_the_match" in latest match details received in the response:::5:::', async () => {
    renderWithBrowserRouter(<App />, {route: '/team-matches/KKR'})
    const {latest_match_details} = recentMatchesResponse

    const manOfTheMatchEl = await screen.findByText(
      latest_match_details.man_of_the_match,
    )
    expect(manOfTheMatchEl).toBeInTheDocument()
    expect(manOfTheMatchEl.tagName).toBe('P')
  })

  it(':::RJSCP9EFN6_TEST_24:::When the HTTP GET request made in Team Matches Route is successful, then the page should consist of HTML image elements with alt as "competing team {competing_team}" and src value equal to the "competing_team_logo" in recent matches received in response:::5:::', async () => {
    renderWithBrowserRouter(<App />, {route: '/team-matches/KKR'})
    const {recent_matches} = recentMatchesResponse

    const firstImg = await screen.findByRole('img', {
      name: new RegExp(
        'competing team ' + recent_matches[0].competing_team,
        'i',
      ),
    })
    const secondImg = await screen.findByRole('img', {
      name: new RegExp(
        'competing team ' + recent_matches[1].competing_team,
        'i',
      ),
    })
    const thirdImg = await screen.findByRole('img', {
      name: new RegExp(
        'competing team ' + recent_matches[2].competing_team,
        'i',
      ),
    })

    expect(firstImg).toBeInTheDocument()
    expect(secondImg).toBeInTheDocument()
    expect(thirdImg).toBeInTheDocument()
    expect(firstImg.src).toBe(recent_matches[0].competing_team_logo)
    expect(secondImg.src).toBe(recent_matches[1].competing_team_logo)
    expect(thirdImg.src).toBe(recent_matches[2].competing_team_logo)
  })

  it(':::RJSCP9EFN6_TEST_25:::When the HTTP GET request made in Team Matches Route is successful, then the page should consist of HTML paragraph elements with text content equal to the "competing_team" in recent matches received in the response:::5:::', async () => {
    renderWithBrowserRouter(<App />, {route: '/team-matches/KKR'})
    const {recent_matches} = recentMatchesResponse

    const firstCompetingTeamNameEl = await screen.findByText(
      recent_matches[0].competing_team,
    )

    const secondCompetingTeamNameEl = screen.getByText(
      recent_matches[1].competing_team,
    )
    const thirdCompetingTeamNameEl = screen.getByText(
      recent_matches[2].competing_team,
    )
    expect(firstCompetingTeamNameEl).toBeInTheDocument()
    expect(firstCompetingTeamNameEl.tagName).toBe('P')

    expect(secondCompetingTeamNameEl).toBeInTheDocument()
    expect(secondCompetingTeamNameEl.tagName).toBe('P')

    expect(thirdCompetingTeamNameEl).toBeInTheDocument()
    expect(thirdCompetingTeamNameEl.tagName).toBe('P')
  })

  it(':::RJSCP9EFN6_TEST_26:::When the HTTP GET request made in Team Matches Route is successful, then the page should consist of HTML paragraph elements with text content equal to the "result" in recent matches received in the response:::5:::', async () => {
    renderWithBrowserRouter(<App />, {route: '/team-matches/KKR'})
    const {recent_matches} = recentMatchesResponse

    const firstMatchResultEl = await screen.findByText(recent_matches[0].result)

    const secondMatchResultEl = screen.getByText(recent_matches[1].result)
    const thirdMatchResultEl = screen.getByText(recent_matches[2].result)

    expect(firstMatchResultEl).toBeInTheDocument()
    expect(firstMatchResultEl.tagName).toBe('P')

    expect(secondMatchResultEl).toBeInTheDocument()
    expect(secondMatchResultEl.tagName).toBe('P')

    expect(thirdMatchResultEl).toBeInTheDocument()
    expect(thirdMatchResultEl.tagName).toBe('P')
  })

  it(':::RJSCP9EFN6_TEST_27:::When the HTTP GET request made in Team Matches Route is successful, then the page should consist of HTML paragraph elements with text content equal to the "match_status" in recent matches received in the response:::5:::', async () => {
    renderWithBrowserRouter(<App />, {route: '/team-matches/KKR'})
    const {recent_matches} = recentMatchesResponse
    const lostEls = await screen.findAllByText(recent_matches[0].match_status, {
      exact: false,
    })

    const wonEls = screen.getAllByText(recent_matches[2].match_status, {
      exact: false,
    })
    expect(lostEls.length).toBeGreaterThanOrEqual(2)
    expect(wonEls.length).toBeGreaterThanOrEqual(1)
    expect(lostEls.every(eachEl => eachEl.tagName === 'P')).toBeTruthy()
    expect(wonEls.every(eachEl => eachEl.tagName === 'P')).toBeTruthy()
  })

  it(':::RJSCP9EFN6_TEST_28:::When "/team-matches/:id" is provided in the URL, then the page should be navigated to the Team Matches Route and consists of the respective umpire names:::5:::', async () => {
    renderWithBrowserRouter(<App />, {route: '/team-matches/KKR'})
    const {latest_match_details} = recentMatchesResponse

    expect(
      await screen.findByText(latest_match_details.umpires),
    ).toBeInTheDocument()
  })

  it(':::RJSCP9EFN6_TEST_29:::When the Team Matches Route is opened and back is clicked in the browser, then the page should be navigated to the Home Route:::5:::', async () => {
    const {history} = rtlRender()

    const teamEl = await screen.findByText(teamsListResponse.teams[1].name)

    userEvent.click(teamEl)

    expect(history.location.pathname).toBe('/team-matches/KKR')
    history.back()
    expect(history.location.pathname).toBe('/')
  })
})
