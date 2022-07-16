// Write your code here
import {Component} from 'react'

import DenominationItem from '../DenominationItem'

import './index.css'

class CashWithdrawal extends Component {
  state = {balance: 2000}

  onDecreaseFun = value => {
    this.setState(prevState => ({balance: prevState.balance - value}))
  }

  render() {
    const name = 'Sarah Williams'
    const {denominationsList} = this.props
    const {balance} = this.state
    console.log(balance)
    return (
      <div className="container1">
        <div className="container2">
          <div className="container3">
            <div className="name">
              <h1 className="icon">{name.slice(0, 1)}</h1>
            </div>
            <h1 className="nameheading">{name}</h1>
          </div>
          <div className="container4">
            <div className="balance">
              <p className="text1">Your Balance</p>
            </div>
            <div className="rupees">
              <p className="amount">{balance}</p>
              <p className="text2">In Rupees</p>
            </div>
          </div>
          <div className="container5">
            <p className="heading2">Withdraw</p>
            <p className="text3">CHOOSE SUM (IN RUPEES)</p>
            <ul className="unorderedlist">
              {denominationsList.map(each => (
                <DenominationItem
                  key={each.id}
                  each={each}
                  onDecreaseFun={this.onDecreaseFun}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default CashWithdrawal
