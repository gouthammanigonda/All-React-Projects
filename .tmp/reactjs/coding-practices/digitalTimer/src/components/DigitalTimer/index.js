// Write your code here
import {Component} from 'react'
import './index.css'

const initialState = {
  isTimerRunning: false,
  initialTimeinSec: 0,
  timerLimit: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount = () => {
    this.clearTimeInterval()
  }

  clearTimeInterval = () => {
    clearInterval(this.intervalId)
  }

  resetBtn = () => {
    this.clearTimeInterval()
    this.setState(initialState)
  }

  onDecreaseTimeLimit = () => {
    const {timerLimit} = this.state
    if (timerLimit > 1) {
      this.setState(prevState => ({
        timerLimit: prevState.timerLimit - 1,
      }))
    }
  }

  onIncreaseTimeLimit = () => {
    this.setState(prevState => ({
      timerLimit: prevState.timerLimit + 1,
    }))
  }

  increaseTimeInSec = () => {
    const {initialTimeinSec, timerLimit} = this.state
    const isTimerCompleted = initialTimeinSec === timerLimit * 60

    if (isTimerCompleted) {
      this.clearTimeInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        initialTimeinSec: prevState.initialTimeinSec + 1,
      }))
    }
  }

  onClickPausePlayBtn = () => {
    const {initialTimeinSec, timerLimit, isTimerRunning} = this.state
    const isTimeCompleted = initialTimeinSec === timerLimit * 60

    if (isTimeCompleted) {
      this.setState({initialTimeinSec: 0})
    }
    if (isTimerRunning) {
      this.clearTimeInterval()
    } else {
      this.intervalId = setInterval(this.increaseTimeInSec, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderPausePlayBtn = () => {
    const {isTimerRunning} = this.state
    const playUrl = 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const playAlt = 'play icon'
    const pauseUrl =
      'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
    const pauseAly = 'pause icon'

    return (
      <div className="button-container">
        <button
          type="button"
          className="start-pause-reset-button"
          onClick={this.onClickPausePlayBtn}
        >
          <img
            className="btnimg"
            src={!isTimerRunning ? playUrl : pauseUrl}
            alt={!isTimerRunning ? playAlt : pauseAly}
          />
          <p className="text">{isTimerRunning ? 'Pause' : 'Start'}</p>
        </button>
      </div>
    )
  }

  getInitialTimeInSecInTimeFormat = () => {
    const {initialTimeinSec, timerLimit} = this.state
    const totRemSec = timerLimit * 60 - initialTimeinSec
    const minutes = Math.floor(totRemSec / 60)
    const seconds = Math.floor(totRemSec % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {initialTimeinSec, timerLimit, isTimerRunning} = this.state
    const isButtonDisabled = initialTimeinSec > 0
    console.log(initialTimeinSec, timerLimit)
    const time = this.getInitialTimeInSecInTimeFormat()
    const lableText = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="container1">
        <h1 className="mainheading">Digital Timer</h1>
        <div className="container2">
          <div className="run-pause-container">
            <div className="time-display">
              <h1 className="timer">{time}</h1>
              <p className="status">{lableText}</p>
            </div>
          </div>
          <div className="timer-start-stop-container">
            <div className="buttons">
              {this.renderPausePlayBtn()}
              <div className="button-container">
                <button
                  type="button"
                  className="start-pause-reset-button"
                  onClick={this.resetBtn}
                >
                  <img
                    className="btnimg"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                  />
                  <p className="text">Reset</p>
                </button>
              </div>
            </div>
            <div className="set-timer-container">
              <p className="timer-heading">Set Timer Limit</p>
              <div className="set-timer-sub-container">
                <button
                  className="set-timer-btn"
                  type="button"
                  disabled={isButtonDisabled}
                  onClick={this.onDecreaseTimeLimit}
                >
                  -
                </button>
                <div className="text-container">
                  <p className="text2">{timerLimit}</p>
                </div>
                <button
                  className="set-timer-btn"
                  type="button"
                  disabled={isButtonDisabled}
                  onClick={this.onIncreaseTimeLimit}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
