// Write your JS code here
import './index.css'

const CryptocurrencyItem = props => {
  const {dataDetails} = props
  const {currencyLogo, currencyName, euroValue, usdValue, id} = dataDetails

  return (
    <li className="listItem">
      <div className="header2">
        <div className="sub-header2-1">
          <div>
            <img className="list-image" src={currencyLogo} alt={currencyName} />
          </div>

          <p className="listheading">{currencyName}</p>
        </div>
        <div className="sub-heading2-2">
          <p className="text">{usdValue}</p>
          <p className="text">{euroValue}</p>
        </div>
      </div>
    </li>
  )
}

export default CryptocurrencyItem
