// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {availableBalance, availableIncome, availableExpenses} = props

  return (
    <div className="container3">
      <div className="subcontainer subcontainer1">
        <img
          className="balanceimg"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png "
          alt="balance"
        />
        <div className="textcontainer">
          <p className="balanceheading">Your Balance</p>
          <p className="balance" testid="balanceAmount">
            Rs {availableBalance}
          </p>
        </div>
      </div>
      <div className="subcontainer subcontainer2">
        <img
          className="balanceimg"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png  "
          alt="income"
        />
        <div className="textcontainer">
          <p className="balanceheading">Your Income</p>
          <p className="balance" testid="incomeAmount">
            {availableIncome}
          </p>
        </div>
      </div>
      <div className="subcontainer subcontainer3">
        <img
          className="balanceimg"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png  "
          alt="expenses"
        />
        <div className="textcontainer">
          <p className="balanceheading">Your Expenses</p>
          <p className="balance" testid="expensesAmount">
            {availableExpenses}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
