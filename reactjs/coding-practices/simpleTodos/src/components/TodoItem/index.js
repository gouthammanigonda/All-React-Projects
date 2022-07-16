// Write your code here

import './index.css'

const TodoItem = props => {
  const {each, onClickDelFun} = props
  const {title, id} = each

  const onClickFun = () => {
    onClickDelFun(id)
  }

  return (
    <li className="listItem">
      <p className="para">{title}</p>
      <button type="button" className="button" onClick={onClickFun}>
        Delete
      </button>
    </li>
  )
}

export default TodoItem
