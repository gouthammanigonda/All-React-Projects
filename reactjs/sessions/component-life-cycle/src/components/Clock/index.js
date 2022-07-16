import {Component} from 'react'
import './index.css'

class Clock extends Component {
  constructor(props) {
    super(props)
    this.state = {date: new Date()}
    console.log('constructor is called')
  }

  componentDidMount() {
    console.log('componentDidMount is called')
    this.timerId = setInterval(() => {
      this.setState({date: new Date()})
    }, 1000)
  }

  componentWillUnmount() {
    console.log('componentWillUnmount is called')
    clearInterval(this.timerId)
  }

  render() {
    const {date} = this.state
    console.log('render is called', date)
    return (
      <div className="clock-container">
        <h1 className="heading">Clock</h1>
        <p className="time">{date.toLocaleTimeString()}</p>
      </div>
    )
  }
}
export default Clock
