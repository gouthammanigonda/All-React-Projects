// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import MatchCard from '../MatchCard'
import LatestMatch from '../LatestMatch'

import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class TeamMatches extends Component {
  state = {
    lastMatchDetail: [],
    recentMatch: [],
    teamBannerUrl: '',
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamDetailsApi()
  }

  getTeamDetailsApi = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/ipl/${id}`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)

    const lastMatchDetails = {
      competingTeam: data.latest_match_details.competing_team,
      competingTeamLogo: data.latest_match_details.competing_team_logo,
      date: data.latest_match_details.date,
      firstInnings: data.latest_match_details.first_innings,
      id: data.latest_match_details.id,
      manOfTheMatch: data.latest_match_details.man_of_the_match,
      matchStatus: data.latest_match_details.match_status,
      result: data.latest_match_details.result,
      secondInnings: data.latest_match_details.second_innings,
      umpires: data.latest_match_details.umpires,
      venue: data.latest_match_details.venue,
    }
    const recentMatches = data.recent_matches.map(each => ({
      competingTeam: each.competing_team,
      competingTeamLogo: each.competing_team_logo,
      date: each.date,
      firstInnings: each.first_innings,
      id: each.id,
      manOfTheMatch: each.man_of_the_match,
      matchStatus: each.match_status,
      result: each.result,
      secondInnings: each.second_innings,
      umpires: each.umpires,
      venue: each.venue,
    }))

    this.setState({
      lastMatchDetail: lastMatchDetails,
      recentMatch: recentMatches,
      teamBannerUrl: data.team_banner_url,
      isLoading: false,
    })
  }

  renderTeamMatches = () => {
    const {lastMatchDetail, recentMatch, teamBannerUrl} = this.state
    return (
      <div>
        <div>
          <img
            className="teambannerimage"
            src={teamBannerUrl}
            alt="team banner"
          />
        </div>
        <div>
          <LatestMatch
            key={lastMatchDetail.id}
            lastMatchDetail={lastMatchDetail}
          />
          <ul className="unorderedList">
            {recentMatch.map(each => (
              <MatchCard key={each.id} recentMatch={each} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {lastMatchDetail, isLoading} = this.state

    console.log(lastMatchDetail)

    const {match} = this.props
    const {params} = match
    const {id} = params

    return (
      <div className={`team-container ${id}`}>
        {isLoading ? (
          <div testId="loader">
            <Loader type="Grid" color="#00BFFF" height={70} width={70} />
          </div>
        ) : (
          this.renderTeamMatches()
        )}
      </div>
    )
  }
}

export default TeamMatches
