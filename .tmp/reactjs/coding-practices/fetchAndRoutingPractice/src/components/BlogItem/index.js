// Write your JS code here
import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class BlogItem extends Component {
  render() {
    const {blogData} = this.props
    const {id, author, avatarUrl, imageUrl, title, topic} = blogData

    return (
      <Link to={`/blogs/${id}`}>
        <div className="main-container">
          <div>
            <img src={imageUrl} className="image-url" alt="image1" />
          </div>
          <div className="sub-container">
            <p className="title">{topic}</p>
            <h1 className="topic">{title}</h1>
            <div className="avatar-container">
              <div>
                <img className="avatar-image" src={avatarUrl} alt="image2" />
              </div>

              <p className="author">{author}</p>
            </div>
          </div>
        </div>
      </Link>
    )
  }
}

export default BlogItem
