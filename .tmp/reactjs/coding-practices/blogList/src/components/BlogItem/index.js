// Write your JS code here
import './index.css'

const BlogItem = props => {
  const {each} = props
  const {title, description, publishedDate} = each
  console.log(title, description, publishedDate)
  return (
    <li className="listItem">
      <div className="flex-box1">
        <h1 className="text heading">{title}</h1>
        <p className="text para1">{publishedDate}</p>
      </div>
      <p className="text para1">{description}</p>
      <hr className="hr-line" />
    </li>
  )
}

export default BlogItem
