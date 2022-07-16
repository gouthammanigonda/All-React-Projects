// Write your code here
import {Component} from 'react'

import './index.css'

class LanguageFilterItem extends Component {
  onClickButtonClicked = () => {
    const {each, updateActiveLanguage} = this.props
    const {id} = each
    updateActiveLanguage(id)
  }

  render() {
    const {each, isButtonActive} = this.props
    const {language} = each
    return (
      <li className="filter-session">
        <button
          className={isButtonActive ? 'button active' : 'button'}
          type="button"
          onClick={this.onClickButtonClicked}
        >
          {language}
        </button>
      </li>
    )
  }
}

export default LanguageFilterItem
