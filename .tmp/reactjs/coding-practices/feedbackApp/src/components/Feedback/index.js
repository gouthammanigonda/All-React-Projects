// Write your React code here.
import {Component} from 'react'
import './index.css'

class Feedback extends Component {
  state = {
    showMsg: false,
  }

  onClickButton = id => {
    this.setState({
      showMsg: true,
    })
  }

  renderButtons = () => {
    const {resources} = this.props
    return (
      <div>
        <h1 className="heading">
          How satisfied are you with our customer support performance
        </h1>
        <ul className="button-container">
          {resources.emojis.map(each => {
            const eachButton = () => {
              this.onClickButton(each.id)
            }
            return (
              <li key={each.id} className="each-button">
                <button className="button" onClick={eachButton}>
                  <img
                    src={each.imageUrl}
                    className="each-img"
                    alt={each.name}
                  />
                </button>
                <p>{each.name}</p>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  renderResults = () => {
    const {activeList} = this.state
    const {resources} = this.props
    return (
      <div className="result-container">
        <img
          src={resources.loveEmojiUrl}
          alt="love emoji"
          className="each-img"
        />
        <h1 className="heading">Thank You</h1>
        <p className="para">
          We will use your feedback to improve our customer service performance
        </p>
      </div>
    )
  }

  render() {
    const {showMsg} = this.state
    return (
      <div className="bg-container">
        <div className="sub-container">
          {showMsg ? this.renderResults() : this.renderButtons()}
        </div>
      </div>
    )
  }
}

export default Feedback
