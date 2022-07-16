import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import BlogItem from '../BlogItem'

import './index.css'

class BlogList extends Component {
  state = {isLoading: true, blogsData: []}

  componentDidMount() {
    this.getBlogsData()
  }

  // FIX11: await should always be used inside async function
  getBlogsData = async () => {
    // FIX12: Spelling of fetch
    const response = await fetch('https://apis.ccbp.in/blogs')
    // FIX13: To get the response in json format we need to call response.json() method
    const data = await response.json()
    const formattedData = data.map(eachItem => ({
      id: eachItem.id,
      title: eachItem.title,
      imageUrl: eachItem.image_url,
      avatarUrl: eachItem.avatar_url,
      author: eachItem.author,
      topic: eachItem.topic,
    }))
    // FIX14: Response received for blogsData should be updated in the state
    this.setState({blogsData: formattedData, isLoading: false})
  }

  render() {
    const {blogsData, isLoading} = this.state
    // FIX15: Fetching of data and updating the state should not be done in the render method as it leads to infinite loops

    return (
      <div className="blogs-list-container">
        {/* FIX16: The testid attribute value should be "loader" */}
        {isLoading ? (
          <div testid="loader">
            <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
          </div>
        ) : (
          <ul className="blogs-list">
            {blogsData.map(eachBlogItem => (
              <BlogItem key={eachBlogItem.id} blogItemDetails={eachBlogItem} />
            ))}
            {/* FIX17: When rendering a list of items we need to use "key" prop */}
          </ul>
        )}
      </div>
    )
  }
}

export default BlogList
