import './index.css'

const Results = props => {
  const {score, onReset} = props

  return (
    <div className="bg-container2">
      <div className="div2">
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png "
          alt="trophy"
          className="trophy"
        />
        <p className="result-heading">YOUR SCORE</p>
        <h1 className="result-para">{score}</h1>
        <button type="button" className="reset-button" onClick={onReset}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png "
            alt="reset"
            className="reset"
          />
          PLAY AGAIN
        </button>
      </div>
    </div>
  )
}

export default Results
