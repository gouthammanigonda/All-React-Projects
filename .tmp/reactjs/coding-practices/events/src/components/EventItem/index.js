// Write your code here
import './index.css'

const EventItem = props => {
  const {details, onChangeRegistrationStatus} = props
  const {imageUrl, name, location, registrationStatus} = details
  const onClickImage = () => {
    onChangeRegistrationStatus(registrationStatus)
  }

  return (
    <li className="list-item">
      <button type="button" className="item-button" onClick={onClickImage}>
        <img
          src={imageUrl}
          alt="event"
          className="image"
          onClick={onClickImage}
        />
      </button>

      <p className="item-heading">{name}</p>
      <p className="item-para">{location}</p>
    </li>
  )
}

export default EventItem
