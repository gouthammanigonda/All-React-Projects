// Write your code here
import Navbar from '../Navbar'
import './index.css'
import ThemeContext from '../../context/ThemeContext'

const NotFound = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const container = isDarkTheme ? 'dark' : ''
      const text = isDarkTheme ? 'text-light' : ''

      return (
        <div>
          <Navbar />
          <div className={`route ${container}`}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/not-found-img.png"
              alt="not found"
              className="not-found-img"
            />
            <h1 className={`not-found-heading ${text}`}>Lost Your Way</h1>
            <p className={`not-found-para  ${text}`}>
              We cannot seem to find the page ypu are looking for
            </p>
          </div>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default NotFound
