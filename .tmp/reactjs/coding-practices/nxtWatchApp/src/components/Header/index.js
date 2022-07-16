import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {FiSun} from 'react-icons/fi'
import {FaMoon} from 'react-icons/fa'
import Popup from 'reactjs-popup'
import BlackAndWhiteContext from '../../BandWContext/BlackAndWhiteContext'
import {
  Container,
  Container2,
  Image,
  Div,
  Div2,
  Button,
  Button2,
  PopupContainer,
  PopDiv,
  PopupHeading,
  PopButton,
  Div3,
} from './styled'

class Header extends Component {
  render() {
    return (
      <BlackAndWhiteContext.Consumer>
        {value => {
          const {isDarkTheme, changeTheme} = value
          const imageUrl = !isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

          const onClickThemeChange = () => {
            changeTheme()
          }

          const onClickLogout = () => {
            Cookies.remove('jwt_token')
            const {history} = this.props
            history.replace('/login')
          }

          return (
            <Container isDarkTheme={isDarkTheme}>
              <Container2>
                <Div key="1">
                  <Link to="/">
                    <Image src={imageUrl} alt="website logo" />
                  </Link>
                </Div>

                <Div2 key="2">
                  <Button
                    data-testid="theme"
                    type="button"
                    onClick={onClickThemeChange}
                  >
                    {isDarkTheme ? (
                      <FiSun color="white" size={30} />
                    ) : (
                      <FaMoon color="black" size={30} />
                    )}
                  </Button>
                  <Image
                    profile
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                  />

                  <Popup
                    modal
                    trigger={
                      <Button2 type="button" isDarkTheme={isDarkTheme}>
                        Logout
                      </Button2>
                    }
                  >
                    {close => (
                      <PopupContainer>
                        <PopDiv key="3" isDarkTheme={!isDarkTheme}>
                          <PopupHeading isDarkTheme={isDarkTheme}>
                            Are you sure, you want to logout
                          </PopupHeading>
                          <Div3>
                            <PopButton onClick={() => close()}>
                              Cancel
                            </PopButton>
                            <PopButton logout onClick={onClickLogout}>
                              Confirm
                            </PopButton>
                          </Div3>
                        </PopDiv>
                      </PopupContainer>
                    )}
                  </Popup>
                </Div2>
              </Container2>
            </Container>
          )
        }}
      </BlackAndWhiteContext.Consumer>
    )
  }
}

export default withRouter(Header)
