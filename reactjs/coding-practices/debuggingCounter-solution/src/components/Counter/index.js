// FIX1: The import statement for Component class should be written like this
import {Component} from 'react'

import './index.css'

// FIX2: To create a class component we need to extend the React "Component" class
class Counter extends Component {
  state = {count: 0}

  onDecrement = () => {
    // FIX3: The state should be updated using "setState" method
    this.setState(prevState => ({count: prevState.count - 1}))
  }

  onIncrement = () => {
    // FIX4: The state should be updated using "setState" method
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  render() {
    // FIX5: We should use const to avoid reassigning a value to the variable
    const {count} = this.state

    return (
      <div className="app-container">
        <h1 className="count">Count {count}</h1>
        {/* FIX6: The event handler onIncrement, should be passed as a reference to the onClick attribute */}
        <button className="button" onClick={this.onIncrement} type="button">
          Increase
        </button>
        {/* FIX7: The event handler onDecrement, should be passed as a reference to the onClick attribute */}
        <button className="button" onClick={this.onDecrement} type="button">
          Decrease
        </button>
      </div>
    )
  }
}

export default Counter
