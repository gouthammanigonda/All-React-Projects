import {Component} from 'react'

import Loader from 'react-loader-spinner'

import BlogItem from '../BlogItem'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

const blogsDataDummy = [
  {
    id: 1,
    title: 'Blog 1',
    imageUrl: 'https://assets.ccbp.in/frontend/react-js/placeholder-1-img.png',
    avatarUrl: 'https://assets.ccbp.in/frontend/react-js/avatar-img.png',
    author: 'Author Name',
    topic: 'React.js',
  },
  {
    id: 2,
    title: 'Blog 2',
    imageUrl: 'https://assets.ccbp.in/frontend/react-js/placeholder-2-img.png',
    avatarUrl: 'https://assets.ccbp.in/frontend/react-js/avatar-img.png',
    author: 'Author Name',
    topic: 'React.js',
  },
]

class BlogsList extends Component {
  state = {
    blogsData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getBlogsList()
  }

  getBlogsList = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    const updatedData = data.map(each => ({
      id: each.id,
      title: each.title,
      imageUrl: each.image_url,
      avatarUrl: each.avatar_url,
      author: each.author,
      topic: each.topic,
    }))
    console.log(updatedData)
    this.setState({
      blogsData: updatedData,
      isLoading: false,
    })
  }

  render() {
    const {blogsData, isLoading} = this.state
    return (
      <div className="blog-list-container">
        {isLoading ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          blogsData.map(item => <BlogItem blogData={item} key={item.id} />)
        )}
      </div>
    )
  }
}

export default BlogsList
