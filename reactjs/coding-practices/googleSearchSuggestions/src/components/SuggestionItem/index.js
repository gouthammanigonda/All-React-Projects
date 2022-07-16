// Write your code here
import './index.css'

const SuggestionItem = props => {
  const {each, onClickArrowBtn} = props
  const {suggestion} = each
  const onclickfun = () => {
    onClickArrowBtn(suggestion)
  }

  return (
    <li className="listItem">
      <p className="para">{suggestion}</p>
      <button className="button" type="button" onClick={onclickfun}>
        <img
          className="arrowimg"
          src="https://assets.ccbp.in/frontend/react-js/diagonal-arrow-left-up.png "
          alt="arrow"
        />
      </button>
    </li>
  )
}
;<h1>hi2</h1>

export default SuggestionItem
