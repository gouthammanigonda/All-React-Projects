// Write your code here.
import './index.css'

const NavBar = props => {
  const {currentScore, isGameProgress, topScore} = props

  return (
    <div className="navbarcontainer">
      <div className="logocontainer">
        <img
          className="navimage"
          src="https://assets.ccbp.in/frontend/react-js/game-logo-img.png"
          alt="emoji logo"
        />
        <h1 className="navheading">Emoji Game</h1>
      </div>
      {isGameProgress && (
        <div className="scorecontainer">
          <p className="navscores">score:{currentScore}</p>
          <p className="navscores">Top Score:{topScore}</p>
        </div>
      )}
    </div>
  )
}

export default NavBar
