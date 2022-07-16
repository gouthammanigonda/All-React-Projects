// Write your JS code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class BlogItemDetails extends Component {
  state = {
    blogData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getBlogItemData()
  }

  getBlogItemData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/blogs/${id}`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    const updatedData = {
      author: data.author,
      avatarUrl: data.avatar_url,
      imageUrl: data.image_url,
      topic: data.topic,
      id: data.id,
      title: data.title,
      content: data.content,
    }
    this.setState({
      blogData: updatedData,
      isLoading: false,
    })
  }

  renderBlogData = () => {
    const {blogData} = this.state
    const {id, author, avatarUrl, imageUrl, topic, title, content} = blogData

    return (
      <div className="container1">
        <h1 className="title1">{title}</h1>
        <div className="sub-container1">
          <div>
            <img src={avatarUrl} alt="image3" className="avatar-image2" />
          </div>
          <p className="author2">{author}</p>
        </div>
        <div>
          <div>
            <img src={imageUrl} className="image-url2" alt={title} />
            <p className="content">{content}</p>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div>
        {isLoading ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          this.renderBlogData()
        )}
      </div>
    )
  }
}

export default BlogItemDetails
