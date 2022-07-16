// Write your code here
import {Component} from 'react'
import './index.css'

class RepositoryItem extends Component {
  render() {
    const {each} = this.props
    const {avatarUrl, forksCount, id, issuesCount, name, starsCount} = each
    console.log(avatarUrl, forksCount, id, issuesCount, name, starsCount)
    return (
      <li className="list-item">
        <img src={avatarUrl} className="avatar-img" alt={name} />
        <h1 className="name-heading">{name}</h1>
        <div className="icon-container">
          <div>
            <img
              className="icon"
              src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
              alt="stars"
            />
          </div>

          <p>{`${starsCount} stars`}</p>
        </div>
        <div className="icon-container">
          <div>
            <img
              className="icon"
              src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
              alt="forks"
            />
          </div>

          <p>{`${forksCount} forks`}</p>
        </div>
        <div className="icon-container">
          <div>
            <img
              className="icon"
              src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png "
              alt="open issues"
            />
          </div>

          <p>{`${issuesCount} open issues`}</p>
        </div>
      </li>
    )
  }
}

export default RepositoryItem
