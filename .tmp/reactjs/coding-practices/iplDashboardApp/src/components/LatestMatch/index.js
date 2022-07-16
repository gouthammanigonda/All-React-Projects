// Write your code here
import './index.css'

const LatestMatch = props => {
  const {lastMatchDetail} = props
  console.log(lastMatchDetail, 'lastmatch')
  const {
    competingTeam,
    competingTeamLogo,
    date,
    firstInnings,
    id,
    manOfTheMatch,
    matchStatus,
    result,
    secondInnings,
    umpires,
    venue,
  } = lastMatchDetail

  return (
    <div className="lastmatchcontainer">
      <div className="lastmatchcontainersubcontainer1">
        <div>
          <p className="competing-heading">{competingTeam}</p>
          <p className="date">{date}</p>
          <p className="common-text">{venue}</p>
          <p className="common-text">{result}</p>
        </div>
      </div>
      <div className="lastmatchcontainersubcontainer2">
        <img
          className="competingTramLogo"
          src={competingTeamLogo}
          alt={`latest match ${competingTeam}`}
        />
      </div>
      <div className="lastmatchcontainersubcontainer3">
        <h1 className="hilight-text">First Innings</h1>
        <p className="common-text">{firstInnings}</p>
        <h1 className="hilight-text">Second Innings</h1>
        <p className="common-text">{secondInnings}</p>
        <h1 className="hilight-text">Man Of The Match</h1>
        <p className="common-text">{manOfTheMatch}</p>
        <h1 className="hilight-text">Umpire</h1>
        <p className="common-text">{umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
