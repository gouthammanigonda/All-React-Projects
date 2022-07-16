import {Component} from 'react'
import {AiOutlineHome, AiOutlineFire} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'
import BlackAndWhiteContext from '../../BandWContext/BlackAndWhiteContext'
import {
  Container2,
  SubContainer,
  Div,
  Para,
  Heading,
  Image,
  Para2,
  Container3,
} from './styled'

class SideBar extends Component {
  render() {
    return (
      <BlackAndWhiteContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const style = {color: '#606060'}
          return (
            <Container2 isDarkTheme={isDarkTheme}>
              <Container3>
                <SubContainer>
                  <Link to="/" className="link">
                    <Div>
                      <AiOutlineHome style={isDarkTheme ? style : null} />
                      <Para isDarkTheme={isDarkTheme}>Home</Para>
                    </Div>
                  </Link>
                  <Link to="/trending" className="link">
                    <Div>
                      <AiOutlineFire style={isDarkTheme ? style : null} />
                      <Para isDarkTheme={isDarkTheme}>Trending</Para>
                    </Div>
                  </Link>
                  <Link to="/gaming" className="link">
                    <Div>
                      <SiYoutubegaming style={isDarkTheme ? style : null} />
                      <Para isDarkTheme={isDarkTheme}>Gaming</Para>
                    </Div>
                  </Link>
                  <Link to="/saved-videos" className="link">
                    <Div>
                      <MdPlaylistAdd style={isDarkTheme ? style : null} />
                      <Para isDarkTheme={isDarkTheme}>Saved videos</Para>
                    </Div>
                  </Link>
                </SubContainer>
                <SubContainer>
                  <Heading isDarkTheme={isDarkTheme}>CONTACT US</Heading>
                  <Div image>
                    <Image
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                      alt="facebook logo"
                    />
                    <Image
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                      alt="twitter logo"
                    />
                    <Image
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                      alt="linked in logo"
                    />
                  </Div>
                  <Para2 isDarkTheme={isDarkTheme}>
                    Enjoy! Now to see your channels and Recommendations!
                  </Para2>
                </SubContainer>
              </Container3>
            </Container2>
          )
        }}
      </BlackAndWhiteContext.Consumer>
    )
  }
}

export default SideBar
