// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {each, toggleisStared} = props
  const {id, title, date, isStarred} = each
  const filledStar =
    'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
  const star =
    'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const starUrl = isStarred ? filledStar : star
  const onClickStar = () => {
    toggleisStared(id)
  }

  return (
    <li className="listitem">
      <div className="details">
        <p className="heading">{title}</p>
        <p className="para">{date}</p>
      </div>
      <div className="star">
        <button
          className="button2"
          type="button"
          onClick={onClickStar}
          testid="star"
        >
          <img className="starimg" src={starUrl} alt="star" />
        </button>
      </div>
    </li>
  )
}

export default AppointmentItem
