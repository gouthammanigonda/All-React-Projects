// Write your code here
import {Link} from 'react-router-dom'
import './index.css'
import ThemeContext from '../../context/ThemeContext'

const Navbar = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme, toggleTheme} = value
      const onChangeTheme = () => {
        toggleTheme()
      }
      const siteLogo = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/website-logo-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/website-logo-light-theme-img.png'
      const themeLogo = !isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/light-theme-img.png'
      const textColor = isDarkTheme ? 'light-text' : ''
      const navContainer = isDarkTheme ? 'light-nav' : ''
      const hrLine = !isDarkTheme ? '' : 'none'
      console.log(isDarkTheme)
      return (
        <div className={navContainer}>
          <div className="navbar">
            <div className="sub-navbar">
              <img src={siteLogo} alt="website logo" className="site-logo" />
              <ul className="links">
                <Link to="/" className="link-style">
                  <li className={`links-text ${textColor}`}>Home</li>
                </Link>
                <Link to="/about" className="link-style">
                  <li className={`links-text ${textColor}`}>About</li>
                </Link>
              </ul>
              <button
                testid="theme"
                type="button"
                className="button"
                onClick={onChangeTheme}
              >
                <img src={themeLogo} alt="theme" className="site-theme" />
              </button>
            </div>
          </div>
          <hr className={`hr-line ${hrLine}`} />
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default Navbar
