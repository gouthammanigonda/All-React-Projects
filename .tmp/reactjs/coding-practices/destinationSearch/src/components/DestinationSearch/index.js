/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/alt-text */
// Write your code here
import {Component} from 'react'
import DestinationItem from '../DestinationItem'
import './index.css'

class DestinationSearch extends Component {
  state = {ipValue: ''}

  onclickfun = event => {
    const {ipValue} = this.state
    this.setState({ipValue: event.target.value})
    console.log(ipValue)
  }

  render() {
    const {destinationsList} = this.props
    const {ipValue} = this.state
    const searchResults = destinationsList.filter(each =>
      each.name.toLowerCase().includes(ipValue.toLowerCase()),
    )

    return (
      <div className="container1">
        <div className="container2">
          <h1 className="heading">Destination Search</h1>
          <div className="container3">
            <input type="search" className="input" onChange={this.onclickfun} />
            <img
              className="image"
              src="https://assets.ccbp.in/frontend/react-js/destinations-search-icon-img.png"
              alt="search icon"
            />
          </div>
          <ul className="unorderlist">
            {searchResults.map(each => (
              <DestinationItem eachDestination={each} key={each.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default DestinationSearch
