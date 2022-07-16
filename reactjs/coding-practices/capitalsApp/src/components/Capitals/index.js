import {Component} from 'react'
import './index.css'

const countryAndCapitalsList = [
  {
    id: 'NEW_DELHI',
    capitalDisplayText: 'New Delhi',
    country: 'India',
  },
  {
    id: 'LONDON',
    capitalDisplayText: 'London',
    country: 'United Kingdom',
  },
  {
    id: 'PARIS',
    capitalDisplayText: 'Paris',
    country: 'France',
  },
  {
    id: 'KATHMANDU',
    capitalDisplayText: 'Kathmandu',
    country: 'Nepal',
  },
  {
    id: 'HELSINKI',
    capitalDisplayText: 'Helsinki',
    country: 'Finland',
  },
]

// Write your code here
class Capitals extends Component {
  state = {
    activeId: countryAndCapitalsList[0].id,
  }

  clickFun = event => {
    this.setState({activeId: event.target.value})
  }

  optionFun = each => {
    const {id, capitalDisplayText} = each
    return (
      <option key={id} value={id}>
        {capitalDisplayText}
      </option>
    )
  }

  render() {
    const {activeId} = this.state
    const findCountry = countryAndCapitalsList.find(
      each => each.id === activeId,
    )
    const filteredCountry = findCountry.country

    return (
      <div className="container1">
        <div className="container2">
          <h1>Countries and Capitals</h1>
          <select className="select" onChange={this.clickFun}>
            {countryAndCapitalsList.map(each => this.optionFun(each))}
          </select>
          <span>is capital of which country?</span>
          <p>{filteredCountry}</p>
        </div>
      </div>
    )
  }
}

export default Capitals
