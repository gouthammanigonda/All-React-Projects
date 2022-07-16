// Write your code here
import './index.css'

const AppItem = props => {
  const {each} = props
  const {appName, imageUrl} = each

  return (
    <li className="listitemapp">
      <img className="imageapp" src={imageUrl} alt={appName} />
      <p className="appheading">{appName}</p>
    </li>
  )
}

export default AppItem
