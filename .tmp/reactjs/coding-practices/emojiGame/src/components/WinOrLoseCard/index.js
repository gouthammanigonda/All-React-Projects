// Write your code here.
import './index.css'

const WinOrLoseCard = props => {
  const {isWin, onClickPlayAgain, score} = props
  const loseUrl = 'https://assets.ccbp.in/frontend/react-js/lose-game-img.png'
  const winUrl = 'https://assets.ccbp.in/frontend/react-js/won-game-img.png'
  const imageUrl = isWin ? winUrl : loseUrl
  const gameStatus = isWin ? 'You Won' : 'You Lose'
  const scoreLabel = isWin ? 'Best Score' : 'Score'

  return (
    <div className="wlcontainer">
      <div className="wlcontainer2">
        <h1 className="wlheading">{gameStatus}</h1>
        <div className="wlcontainer3">
          <p className="wlbestscore">{scoreLabel}</p>
          <p className="wlscore">{score}/12</p>
          <button className="wlbutton" type="button" onClick={onClickPlayAgain}>
            Play Again
          </button>
        </div>
      </div>
      <div className="wl">
        <img className="winloseimg" src={imageUrl} alt="win or lose" />
      </div>
    </div>
  )
}

export default WinOrLoseCard
