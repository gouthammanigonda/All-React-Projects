import './index.css'

const Header = props => {
  const {score, timer, stopTimer} = props
  if (timer === 1) {
    stopTimer()
  }

  return (
    <ul key="ul1" className="header-container">
      <li key="1" className="img-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png "
          alt="website logo"
          className="logo-img"
        />
      </li>
      <li key="2" className="score-container">
        <div>
          <p className="header-heading">
            score: <span className="span-ele">{score}</span>
          </p>
        </div>

        <div className="timer-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
            alt="timer"
            className="timer"
          />
          <p className="span-ele">{timer} sec</p>
        </div>
      </li>
    </ul>
  )
}

export default Header
