// Write your code here
import {Component} from 'react'
import './index.css'

class Stopwatch extends Component {
  render() {
    return (
      <div className="container1">
        <div className="container2">
          <h1>Stopwatch</h1>
          <div className="container3">
            <div className="subContainer1">
              <img
                className="img"
                src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
                alt="stopwatch"
              />
              <p className="para">Timer</p>
            </div>
            <h1 className="timer">00:00</h1>
            <div className="btn">
              <button
                className="button green"
                type="button"
                onClick={this.startBtn}
              >
                Start
              </button>
              <button
                className="button red"
                type="button"
                onClick={this.stopBtn}
              >
                Stop
              </button>
              <button
                className="button yellow"
                type="button"
                onClick={this.resetBtn}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch
