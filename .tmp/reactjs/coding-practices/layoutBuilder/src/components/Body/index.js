// Write your code here
import {Component} from 'react'
import ConfigurationContext from '../../context/ConfigurationContext'
import './index.css'

class Body extends Component {
  renderLeftNavbar = () => (
    <div className="body-sub-container">
      <div className="each-sub-container">
        <h1 className="body-heading">Left Navbar Menu</h1>
        <ul>
          <li className="body-para">Item 1</li>
          <li className="body-para">Item 2</li>
          <li className="body-para">Item 3</li>
          <li className="body-para">Item 4</li>
        </ul>
      </div>
    </div>
  )

  renderContent = () => (
    <div className="body-sub-container-content">
      <div className="each-sub-container">
        <h1 className="body-heading">Content</h1>
        <p className="body-para">
          Lorem ipsum hi, this is Lucifer How are you doing there?
        </p>
      </div>
    </div>
  )

  renderRightNavbar = () => (
    <div className="body-sub-container">
      <div className="each-sub-container">
        <h1 className="body-heading">Right Navbar</h1>
        <div className="right-navbar-ad">
          <p className="body-para">Ad 1</p>
        </div>
        <div className="right-navbar-ad">
          <p className="body-para">Ad 2</p>
        </div>
      </div>
    </div>
  )

  render() {
    return (
      <ConfigurationContext.Consumer>
        {value => {
          const {showContent, showLeftNavbar, showRightNavbar} = value
          return (
            <div className="body-container">
              {showLeftNavbar && this.renderLeftNavbar()}
              {showContent && this.renderContent()}
              {showRightNavbar && this.renderRightNavbar()}
            </div>
          )
        }}
      </ConfigurationContext.Consumer>
    )
  }
}

export default Body
