// Write your code here
import './index.css'

const TabItem = props => {
  const {each, changeStateTabId, isActive} = props
  const {tabId, displayText} = each
  const classNameTab = isActive ? 'tabbutton active' : 'tabbutton'
  const clickFun = () => {
    changeStateTabId(tabId)
  }

  return (
    <li className="listitemtab">
      <button type="button" className={classNameTab} onClick={clickFun}>
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
