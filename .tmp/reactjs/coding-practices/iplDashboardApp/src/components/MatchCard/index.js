// Write your code here
import './index.css'

const MatchCard = props => {
  const {recentMatch} = props
  console.log(recentMatch)
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
  } = recentMatch
  const color = matchStatus === 'Won' ? 'green' : 'red'
  return (
    <li className="recentMatchContainer">
      <div className="flex-container">
        <img
          className="recentMatchImage"
          src={competingTeamLogo}
          alt={`latest match ${competingTeam}`}
        />
        <h1 className="competingTeamHeading">{competingTeam}</h1>
        <p className="result">{result}</p>
        <p className={`text-style ${color}`}>{matchStatus}</p>
      </div>
    </li>
  )
}

export default MatchCard
