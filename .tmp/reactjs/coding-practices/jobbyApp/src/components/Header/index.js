import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header">
      <div className="header-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo position"
          />
        </Link>
        <div className="link-container">
          <Link to="/" className="link-style">
            <p className="header-text">Home</p>
          </Link>
          <Link to="/jobs" className="link-style">
            <p className="header-text">Jobs</p>
          </Link>
        </div>
        <button
          type="button"
          className="form-button btn-width"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
