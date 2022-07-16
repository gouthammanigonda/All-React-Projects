import {Component} from 'react'
import {v4} from 'uuid'
import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here

class Comments extends Component {
  state = {
    reviewList: [],
    userNameIp: '',
    commentIp: '',
  }

  onSubmitFun = event => {
    event.preventDefault()
    const {userNameIp, commentIp} = this.state
    const backgroundColor =
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * (initialContainerBackgroundClassNames.length - 1),
        )
      ]

    if (userNameIp !== '' && commentIp !== '') {
      const newList = {
        id: v4(),
        userName: userNameIp,
        comment: commentIp,
        date: new Date(),
        isLiked: false,
        backgroundColor: `${backgroundColor}`,
      }
      this.setState(prevState => ({
        reviewList: [...prevState.reviewList, newList],
        userNameIp: '',
        commentIp: '',
      }))
    }
  }

  onDeleteClick = id => {
    const {reviewList} = this.state
    const filteredlist = reviewList.filter(each => each.id !== id)
    this.setState({reviewList: filteredlist})
  }

  onLikeClick = id => {
    this.setState(prevState => ({
      reviewList: prevState.reviewList.map(each => {
        if (each.id === id) {
          return {...each, isLiked: !each.isLiked}
        }
        return each
      }),
    }))
  }

  onChangetext = event => {
    this.setState({userNameIp: event.target.value})
  }

  onChangeTextArea = event => {
    this.setState({commentIp: event.target.value})
  }

  render() {
    const {reviewList, userNameIp, commentIp} = this.state

    console.log(reviewList)
    const count = reviewList.length

    return (
      <div className="container1">
        <div className="container2">
          <form className="infocontainer" onSubmit={this.onSubmitFun}>
            <h1 className="heading">Comments</h1>
            <p className="para">Say Something about ccbp 4.0</p>
            <input
              onChange={this.onChangetext}
              className="text"
              type="text"
              value={userNameIp}
              placeholder="Your Name"
            />
            <textarea
              onChange={this.onChangeTextArea}
              className="textarea"
              placeholder="Your Comment"
              value={commentIp}
              rows={7}
              cols={20}
            />
            <button type="submit" className="button">
              {' '}
              Add Comment
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
            className="commentsImage"
          />
        </div>
        <hr className="hrline" />
        <div className="commentcount">
          <div className="countcolor">
            <span className="count">{count}</span>
          </div>
          <p className="countheading">Comments</p>
        </div>

        <ul className="unorderedlist">
          {reviewList.map(each => (
            <CommentItem
              key={each.id}
              each={each}
              onDeleteClick={this.onDeleteClick}
              onLikeClick={this.onLikeClick}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
