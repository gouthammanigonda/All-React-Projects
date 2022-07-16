// Write your code here
import {Component} from 'react'
import SuggestionItem from '../SuggestionItem'
import './index.css'

class GoogleSuggestions extends Component {
  state = {
    searchIp: '',
  }

  onClickArrowBtn = suggestion => {
    this.setState({searchIp: suggestion})
  }

  onChangeFun = event => {
    this.setState({searchIp: event.target.value})
  }

  render() {
    const {suggestionsList} = this.props
    const {searchIp} = this.state
    const filteredList = suggestionsList.filter(each =>
      each.suggestion.toLowerCase().includes(searchIp.toLowerCase()),
    )

    return (
      <div className="container1">
        <h1 className="heading">
          <span className="color1">G</span>
          <span className="color2">o</span>
          <span className="color3">o</span>
          <span className="color1">g</span>
          <span className="color4">l</span>
          <span className="color2">e</span>
          {/* <img
            className="googleimg"
            src="https://assets.ccbp.in/frontend/react-js/google-logo.png "
            alt="google logo"
          /> */}
        </h1>
        <div className="container2">
          <div className="searchcontainer">
            <img
              className="searchimg"
              src="https://assets.ccbp.in/frontend/react-js/google-search-icon.png "
              alt="search icon"
            />
            <input
              type="search"
              className="input"
              onChange={this.onChangeFun}
              value={searchIp}
              placeholder="Search Google"
            />
          </div>
          <ul className="unorderedList">
            {filteredList.map(each => (
              <SuggestionItem
                key={each.id}
                each={each}
                onClickArrowBtn={this.onClickArrowBtn}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default GoogleSuggestions
