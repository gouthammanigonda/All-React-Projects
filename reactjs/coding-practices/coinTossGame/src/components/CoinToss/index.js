// Write your code here
import {Component} from 'react'
import './index.css'

const imgurl1 = 'https://assets.ccbp.in/frontend/react-js/heads-img.png'
const imgurl2 = 'https://assets.ccbp.in/frontend/react-js/tails-img.png'

class CoinToss extends Component {
  state = {
    imageUrl: imgurl1,
    headsCount: 0,
    talesCount: 0,
  }

  onClickFun = () => {
    const {headsCount, talesCount} = this.state
    const randNum = Math.floor(Math.random() * 2)
    let img
    let heads = headsCount
    let tails = talesCount
    if (randNum === 0) {
      img = imgurl1
      heads += 1
    } else {
      img = imgurl2
      tails += 1
    }
    this.setState({
      imageUrl: img,
      headsCount: heads,
      talesCount: tails,
    })
  }

  render() {
    const {imageUrl, headsCount, talesCount} = this.state
    const total = headsCount + talesCount

    return (
      <div className="container1">
        <div className="container2">
          <h1 className="heading">Coin Toss Game</h1>
          <p className="para">Heads (or) Tails</p>
          <img className="image" src={imageUrl} alt="toss result" />
          <button className="button" type="button" onClick={this.onClickFun}>
            Toss Coin
          </button>

          <div className="results">
            <p className="resultspara">Total:{total}</p>
            <p className="resultspara">Heads:{headsCount}</p>
            <p className="resultspara">Tails:{talesCount}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default CoinToss
