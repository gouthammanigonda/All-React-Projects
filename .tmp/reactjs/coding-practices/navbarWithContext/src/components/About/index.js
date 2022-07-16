// Write your code here
import Navbar from '../Navbar'
import './index.css'
import ThemeContext from '../../context/ThemeContext'

const About = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const container = isDarkTheme ? 'route dark' : 'route'
      const image = !isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/about-light-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/about-dark-img.png'
      const text = isDarkTheme ? 'route-heading text-light' : 'route-heading'
      return (
        <div>
          <Navbar />
          <div className={container}>
            <img src={image} alt="about" className="route-img" />
            <h1 className={text}>About</h1>
          </div>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default About
