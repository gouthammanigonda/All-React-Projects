// Write your code here.
import {Component} from 'react'
import './index.css'

class FaqItem extends Component {
  state = {showAns: false}

  showHideAns = () => {
    const {faq} = this.props
    const {answerText} = faq
    const {showAns} = this.state
    if (showAns) {
      return (
        <div>
          <hr />
          <p>{answerText}</p>
        </div>
      )
    }
    return null
  }

  onClickPlusMinusBTN = () => {
    this.setState(prevState => ({
      showAns: !prevState.showAns,
    }))
  }

  renderButton = () => {
    const {showAns} = this.state
    const altText = showAns ? 'minus' : 'plus'
    const plusUrl =
      'https://assets.ccbp.in/frontend/react-js/faqs-plus-icon-img.png'
    const minusUrl =
      'https://assets.ccbp.in/frontend/react-js/faqs-minus-icon-img.png'
    const url = showAns ? minusUrl : plusUrl
    return (
      <button
        type="button"
        className="button"
        onClick={this.onClickPlusMinusBTN}
      >
        <img src={url} className="img" alt={altText} />
      </button>
    )
  }

  render() {
    const {faq} = this.props
    const {questionText} = faq

    return (
      <li className="listItem">
        <div className="item1">
          <h1 className="itemheading">{questionText}</h1>
          {this.renderButton()}
        </div>
        {this.showHideAns()}
      </li>
    )
  }
}

export default FaqItem
