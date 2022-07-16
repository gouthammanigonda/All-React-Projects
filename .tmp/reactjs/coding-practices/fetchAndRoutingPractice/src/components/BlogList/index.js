// Write your JS code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import BlogItem from '../BlogItem'

class BlogList extends Component {
  state = {blogsList: [], isLoading: true}

  componentDidMount() {
    this.getBlogsListItems()
  }

  getBlogsListItems = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    const updatedData = data.map(each => ({
      author: each.author,
      avatarUrl: each.avatar_url,
      id: each.id,
      imageUrl: each.image_url,
      title: each.title,
      topic: each.topic,
    }))
    this.setState({
      blogsList: updatedData,
      isLoading: false,
    })
  }

  render() {
    const {isLoading, blogsList} = this.state
    return (
      <div>
        {isLoading ? (
          <Loader
            type="TailSpin"
            color="#00BFFF"
            height={50}
            width={50}
            textId="loader"
          />
        ) : (
          blogsList.map(each => <BlogItem key={each.id} blogData={each} />)
        )}
      </div>
    )
  }
}

export default BlogList
