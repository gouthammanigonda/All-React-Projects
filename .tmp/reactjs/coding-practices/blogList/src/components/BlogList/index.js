// Write your JS code here
import BlogsItem from '../BlogItem'

const BlogsList = props => {
  const {blogsList} = props
  return (
    <ul>
      {blogsList.map(each => (
        <BlogsItem key={each.id} each={each} />
      ))}
    </ul>
  )
}

export default BlogsList
