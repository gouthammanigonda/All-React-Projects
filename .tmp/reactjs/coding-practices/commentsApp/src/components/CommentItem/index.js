// Write your code here
import './index.css'
import {formatDistanceToNow} from 'date-fns'

const CommentItem = props => {
  const {each, onDeleteClick, onLikeClick} = props
  const {id, userName, comment, date, isLiked, backgroundColor} = each
  const firstLetter = userName ? userName[0].toUpperCase() : ''
  const likeClassName = isLiked ? 'active' : ''

  const likeUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const posted = formatDistanceToNow(date)

  const likeFun = () => {
    onLikeClick(id)
  }

  const deleteFun = () => {
    onDeleteClick(id)
  }

  return (
    <li className="listItem">
      <div className="iconheader">
        <div className={`icon ${backgroundColor}`}>
          <h1 className="iconheading">{firstLetter}</h1>
        </div>
        <div>
          <div className="namecomment">
            <div className="headder">
              <h1 className="namestyle">{userName}</h1>
              <p className="time">{posted}</p>
            </div>
            <p className="commentstyle">{comment}</p>
          </div>
        </div>
      </div>
      <div className="likedelete">
        <div className="likecontainer">
          <button className="likebutton" type="button" onClick={likeFun}>
            <img className="likeimg" src={likeUrl} alt="like" />
          </button>

          <p className={`like ${likeClassName}`}>Like</p>
        </div>
        <div>
          <button
            className="deletebutton"
            type="button"
            testid="delete"
            onClick={deleteFun}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
              alt="delete"
            />
          </button>
        </div>
      </div>
      <hr className="hrline2" />
    </li>
  )
}

export default CommentItem
