import {Component} from 'react'
import {v4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    transactionHistory: [],
    titleIp: '',
    amountIp: '',
    optionIp: transactionTypeOptions[0].optionId,
  }

  onClickdeleteicon = id => {
    const {transactionHistory} = this.state
    const filteredHistory = transactionHistory.filter(each => each.id !== id)
    this.setState({
      transactionHistory: filteredHistory,
    })
  }

  addData = event => {
    event.preventDefault()
    const {titleIp, amountIp, optionIp} = this.state
    const typeOption = transactionTypeOptions.find(
      each => each.optionId === optionIp,
    )
    const {displayText} = typeOption
    const newData = {
      id: v4(),
      title: titleIp,
      amount: parseInt(amountIp),
      displayType: displayText,
    }

    this.setState(prevState => ({
      transactionHistory: [...prevState.transactionHistory, newData],
      titleIp: '',
      amountIp: '',
      optionIp: transactionTypeOptions[0].optionId,
    }))
  }

  onChangeTitle = event => {
    this.setState({titleIp: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amountIp: event.target.value})
  }

  onChangeOptionId = event => {
    this.setState({optionIp: event.target.value})
  }

  getExpenses = () => {
    const {transactionHistory} = this.state
    let expenses = 0
    transactionHistory.forEach(each => {
      if (each.displayType === transactionTypeOptions[1].displayText) {
        expenses += each.amount
      }
    })
    return expenses
  }

  getIncome = () => {
    const {transactionHistory} = this.state
    let income = 0
    transactionHistory.forEach(each => {
      if (each.displayType === transactionTypeOptions[0].displayText) {
        income += each.amount
      }
    })
    return income
  }

  getBalance = () => {
    const {transactionHistory} = this.state
    let income = 0
    let expenses = 0
    let balance = 0

    transactionHistory.forEach(each => {
      if (transactionTypeOptions[0].displayText === each.displayType) {
        income += each.amount
      } else {
        expenses += each.amount
      }
    })

    balance = income - expenses

    return balance
  }

  render() {
    const {transactionHistory, titleIp, amountIp, optionIp} = this.state
    const availableBalance = this.getBalance()

    const availableIncome = this.getIncome()
    const availableExpenses = this.getExpenses()

    return (
      <div className="container1">
        <div className="container2">
          <h1 className="mainheading">Hi, Richard</h1>
          <p className="para">
            Welcome back to your<span className="spanele">Money Manager</span>
          </p>
        </div>
        <MoneyDetails
          availableBalance={availableBalance}
          availableIncome={availableIncome}
          availableExpenses={availableExpenses}
        />
        <div className="container4">
          <form className="form" onSubmit={this.addData}>
            <h1 className="formheading">Add Transaction</h1>
            <label className="label" htmlFor="text">
              TITLE
            </label>
            <input
              className="input"
              type="text"
              id="text"
              placeholder="TITLE"
              value={titleIp}
              onChange={this.onChangeTitle}
            />
            <label className="label" htmlFor="text2">
              AMOUNT
            </label>
            <input
              className="input"
              type="text"
              id="text2"
              placeholder="AMOUNT"
              value={amountIp}
              onChange={this.onChangeAmount}
            />
            <label className="label" htmlFor="select">
              TYPE
            </label>
            <select
              className="input"
              id="select"
              value={optionIp}
              onChange={this.onChangeOptionId}
            >
              {transactionTypeOptions.map(each => (
                <option key={each.optionId} value={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="formbtn">
              Add
            </button>
          </form>

          <div className="subcontainer4">
            <h1 className="histryheading">History</h1>
            <ul className="unorderedlist">
              <li className="listitem1">
                <p className="category">Title</p>
                <p className="category">Amount</p>
                <p className="category">Type</p>
              </li>
              {transactionHistory.map(each => (
                <TransactionItem
                  key={each.id}
                  each={each}
                  onClickdeleteicon={this.onClickdeleteicon}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
