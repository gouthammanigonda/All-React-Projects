// Write your JS code here
import './index.css'

const Header = () => (
  <div>
    <div className="logo-container">
      <img
        className="logo-image"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
        alt="website logo"
      />
    </div>
    <ul className="link-container">
      <li className="link-heading">Home</li>
      <li className="link-heading">Products</li>
      <li className="link-heading">Cart</li>
      <div>
        <button className="button" type="button">
          Logout
        </button>
      </div>
    </ul>
  </div>
)

export default Header
