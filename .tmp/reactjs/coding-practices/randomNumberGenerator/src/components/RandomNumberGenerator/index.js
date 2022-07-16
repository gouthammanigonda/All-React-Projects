// Write your code here
import {Component} from 'react'
import './index.css'

class RandomNumberGenerator extends Component {
  state = {randNum: '0'}

  generate = () => {
    const {randNum} = this.state
    const randNumValue = Math.floor(Math.random() * 101)
    this.setState({randNum: randNumValue})
    console.log(randNumValue)
    console.log(randNum)
  }

  render() {
    const {randNum} = this.state

    return (
      <div className="container1">
        <div className="container2">
          <h1 className="heading">Random Number</h1>
          <p className="para">
            Generate a random number in the range of 0 to 100
          </p>
          <button type="button" className="button" onClick={this.generate}>
            Generate
          </button>
          <p className="heading">{randNum}</p>
        </div>
      </div>
    )
  }
}

export default RandomNumberGenerator
