import Header from '../Header'
import SideBar from '../SideBar'
import BlackAndWhiteContext from '../../BandWContext/BlackAndWhiteContext'
import {MainContainer, NotFoundDiv, Image, Heading, Para} from './styled'

const NotFound = () => (
  <BlackAndWhiteContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const imageUrl = !isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
      return (
        <div>
          <Header />
          <MainContainer>
            <SideBar />
            <NotFoundDiv isDarkTheme={isDarkTheme}>
              <Image src={imageUrl} alt="not found" />
              <Heading isDarkTheme={isDarkTheme}>Page Not Found</Heading>
              <Para isDarkTheme={isDarkTheme}>
                we are sorry, the page you requested could not be found.
              </Para>
            </NotFoundDiv>
          </MainContainer>
        </div>
      )
    }}
  </BlackAndWhiteContext.Consumer>
)

export default NotFound
