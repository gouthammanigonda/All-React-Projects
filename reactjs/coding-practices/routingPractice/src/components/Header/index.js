// Write your JS code here
import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <div className="header-container">
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/wave-logo-img.png"
        alt="wave"
        className="headerimg"
      />
    </div>

    <div className="header-sub-container">
      <Link to="/" className="header-text">
        Home
      </Link>
      <Link to="/about" className="header-text">
        About
      </Link>
      <Link to="/contact" className="header-text">
        Contacts
      </Link>
    </div>
  </div>
)

export default Header
