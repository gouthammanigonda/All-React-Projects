// Write your JS code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import CryptocurrencyItem from '../CryptocurrencyItem'
import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class CryptocurrenciesList extends Component {
  state = {
    dataList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getDataByApi()
  }

  getDataByApi = async () => {
    const url = 'https://apis.ccbp.in/crypto-currency-converter'
    const response = await fetch(url)
    const data = await response.json()

    const updatedData = data.map(each => ({
      currencyLogo: each.currency_logo,
      currencyName: each.currency_name,
      euroValue: each.euro_value,
      usdValue: each.usd_value,
      id: each.id,
    }))
    this.setState({
      dataList: updatedData,
      isLoading: false,
    })
  }

  renderList = () => {
    const {dataList} = this.state
    return (
      <div className="main-container2">
        <h1 className="main-heading">Cryptocurrency Tracker</h1>
        <div>
          <img
            className="image"
            src="https://assets.ccbp.in/frontend/react-js/cryptocurrency-bg.png"
            alt="cryptocurrency"
          />
        </div>
        <ul className="unorderedList">
          <div className="header">
            <h1 className="text">Coin Type</h1>
            <div className="sub-header-container">
              <h1 className="text">USD</h1>
              <h1 className="text">EURO</h1>
            </div>
          </div>
          {dataList.map(each => (
            <CryptocurrencyItem key={each.id} dataDetails={each} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div>
        {isLoading ? (
          <div className="loader" testId="loader">
            <Loader type="Rings" color="#ffffff" height={80} width={80} />
          </div>
        ) : (
          this.renderList()
        )}
      </div>
    )
  }
}

export default CryptocurrenciesList
