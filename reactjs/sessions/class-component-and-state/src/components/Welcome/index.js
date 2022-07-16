import {Component} from 'react'
import './index.css'

class Counter extends Component {
  render() {
    const {name} = this.props
    return (
      <div className="container">
        <h1 className="heading">Counter</h1>
        <p className="count">0</p>
        <div className="button">Increase</div>
        <div className="button">Decrease</div>
      </div>
    )
  }
}

export default Counter
