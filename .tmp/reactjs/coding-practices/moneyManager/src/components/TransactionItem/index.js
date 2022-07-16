// Write your code here
import './index.css'

const TransactionItem = props => {
  const {each, onClickdeleteicon} = props
  const {id, title, amount, displayType} = each
  const deleteicon = () => {
    onClickdeleteicon(id)
  }

  return (
    <li className="listitem2">
      <p className="listtext">{title}</p>
      <p className="listtext">Rs{amount}</p>
      <p className="listtext">{displayType}</p>
      <button
        className="listbtn"
        type="button"
        onClick={deleteicon}
        testid="delete"
      >
        <img
          className="listimg"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png "
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
