/* 
Quick Tip 

- Use the below function in the EmojiGame Component to shuffle the emojisList every time when an emoji is clicked.

const shuffledEmojisList = () => {
  const {emojisList} = this.props
  return emojisList.sort(() => Math.random() - 0.5)
}

*/

// Write your code here.
import {Component} from 'react'
import NavBar from '../NavBar'
import EmojiCard from '../EmojiCard'
import WinOrLoseCard from '../WinOrLoseCard'
import './index.css'

class EmojiGame extends Component {
  state = {
    checkedEmojiList: [],
    isGameProgress: true,
    topScore: 0,
  }

  reset = () => {
    this.setState({
      checkedEmojiList: [],
      isGameProgress: true,
    })
  }

  shuffledEmojisList = () => {
    const {emojisList} = this.props
    return emojisList.sort(() => Math.random() - 0.5)
  }

  finishGameAndSetTopscore = currentScore => {
    const {topScore} = this.state
    let newTopScore = topScore
    if (currentScore > topScore) {
      newTopScore = currentScore
    }
    this.setState({topScore: newTopScore, isGameProgress: false})
  }

  checkEmoji = id => {
    const {emojisList} = this.props
    const {checkedEmojiList} = this.state

    const isEmojiPresent = checkedEmojiList.includes(id)
    const clickedEmojiLenght = checkedEmojiList.length
    console.log(clickedEmojiLenght)
    if (isEmojiPresent) {
      this.finishGameAndSetTopscore(clickedEmojiLenght)
    } else {
      if (emojisList.length - 1 === clickedEmojiLenght) {
        this.finishGameAndSetTopscore(emojisList.length)
      }

      this.setState(prevState => ({
        checkedEmojiList: [...prevState.checkedEmojiList, id],
      }))
    }
  }

  renderScoreCard = () => {
    const {checkedEmojiList} = this.state
    const {emojisList} = this.props
    return (
      <div>
        <WinOrLoseCard
          isWin={checkedEmojiList.length === emojisList.length}
          onClickPlayAgain={this.reset}
          score={checkedEmojiList.length}
        />
      </div>
    )
  }

  renderEmojiLists = () => {
    const shiftedList = this.shuffledEmojisList()
    console.log(shiftedList)

    return (
      <ul className="unorderedlist">
        {shiftedList.map(each => (
          <EmojiCard key={each.id} each={each} checkEmoji={this.checkEmoji} />
        ))}
      </ul>
    )
  }

  render() {
    const {checkedEmojiList, isGameProgress, topScore} = this.state
    console.log(checkedEmojiList)

    return (
      <div className="container1">
        <NavBar
          currentScore={checkedEmojiList.length}
          isGameProgress={isGameProgress}
          topScore={topScore}
        />
        <div className="flex">
          {isGameProgress ? this.renderEmojiLists() : this.renderScoreCard()}
        </div>
      </div>
    )
  }
}

export default EmojiGame
