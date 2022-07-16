// Write your code here

import './index.css'

const DenominationItem = props => {
  const {each, onDecreaseFun} = props
  const {value} = each
  const onClickfun = () => {
    onDecreaseFun(value)
  }

  return (
    <li className="listitem">
      <button type="button" className="button" onClick={onClickfun}>
        {value}
      </button>
    </li>
  )
}

export default DenominationItem
