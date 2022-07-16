// Write your code here
import {Component} from 'react'
import './index.css'

class ReviewsCarousel extends Component {
  state = {index: 0}

  onClickLeftButton = () => {
    const {index} = this.state
    let updatedIndex = index
    if (index > 0) {
      updatedIndex -= 1
    } else {
      updatedIndex = 0
    }
    this.setState({index: updatedIndex})
  }

  onClickRightButton = () => {
    const {index} = this.state
    let updatedIndex = index
    if (index < 3) {
      updatedIndex += 1
    } else {
      updatedIndex = 3
    }
    this.setState({index: updatedIndex})
  }

  render() {
    const {index} = this.state
    const {reviewsList} = this.props
    const requiredList = reviewsList[index]
    const {imgUrl, username, companyName, description} = requiredList

    return (
      <div className="container1">
        <h1 className="heading">Reviews</h1>
        <div className="reviewContainer">
          <button
            testid="leftArrow"
            className="button"
            type="button"
            onClick={this.onClickLeftButton}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/left-arrow-img.png "
              alt="left arrow"
            />
          </button>
          <div className="detailsContainer">
            <img src={imgUrl} alt={username} />
            <p className="userName">{username}</p>
            <p className="companyName">{companyName}</p>
            <p className="description">{description}</p>
          </div>
          <button
            testid="rightArrow"
            className="button"
            type="button"
            onClick={this.onClickRightButton}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/right-arrow-img.png "
              alt="right arrow"
            />
          </button>
        </div>
      </div>
    )
  }
}

export default ReviewsCarousel
