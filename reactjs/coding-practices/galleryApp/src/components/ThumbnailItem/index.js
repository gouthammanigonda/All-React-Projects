// Write your code here.
import './index.css'

const ThumbnailItem = props => {
  const {each, changeImage, isActive, key} = props
  const {id, thumbnailUrl, thumbnailAltText} = each
  const imageclassName = isActive ? 'active' : 'inactive'

  const onClickFun = () => {
    changeImage(id)
  }

  return (
    <li key={key} className="listitems">
      <button className="button" type="button" onClick={onClickFun}>
        <img
          className={imageclassName}
          src={thumbnailUrl}
          alt={thumbnailAltText}
        />
      </button>
    </li>
  )
}

export default ThumbnailItem
