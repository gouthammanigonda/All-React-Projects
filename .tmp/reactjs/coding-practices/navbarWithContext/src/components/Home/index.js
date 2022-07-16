// Write your code here
import Navbar from '../Navbar'
import './index.css'
import ThemeContext from '../../context/ThemeContext'

const Home = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const homeImg = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/home-dark-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/home-light-img.png'
      const container = isDarkTheme ? 'dark' : ''
      const text = isDarkTheme ? 'text-light' : ''
      return (
        <div>
          <Navbar />
          <div className={`route ${container}`}>
            <img src={homeImg} alt="home" className="route-img" />
            <h1 className={`route-heading ${text}`}>Home</h1>
          </div>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default Home
