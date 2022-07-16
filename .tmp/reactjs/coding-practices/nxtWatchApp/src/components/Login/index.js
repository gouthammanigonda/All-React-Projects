import {Component} from 'react'
import Cookies from 'js-cookie'
import {
  Container,
  Container2,
  Form,
  Div,
  Input,
  Label,
  Image,
  Button,
  ErrorMsg,
} from './styled'
import BlackNWhiteContext from '../../BandWContext/BlackAndWhiteContext'

class Login extends Component {
  state = {
    usernameIp: '',
    passwordIp: '',
    showPassword: false,
    errorMsg: '',
    showErrorMsg: false,
  }

  getLoginDetails = async () => {
    const {usernameIp, passwordIp} = this.state
    const userDetails = {
      username: usernameIp,
      password: passwordIp,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const token = data.jwt_token

      Cookies.set('jwt_token', token, {expires: 30, path: '/'})
      const {history} = this.props
      history.replace('/')
      this.setState({
        showErrorMsg: false,
      })
    } else {
      const errorMsg = data.error_msg
      this.setState({
        errorMsg,
        showErrorMsg: true,
      })
    }
  }

  onClickLogin = event => {
    event.preventDefault()
    this.getLoginDetails()
  }

  onChangeUsername = event => {
    this.setState({
      usernameIp: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      passwordIp: event.target.value,
    })
  }

  onChangeCheckbox = event => {
    this.setState({
      showPassword: event.target.checked,
    })
  }

  render() {
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      const {history} = this.props
      history.replace('/')
    }

    return (
      <BlackNWhiteContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const imageUrl = !isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          const {
            showPassword,
            usernameIp,
            passwordIp,
            errorMsg,
            showErrorMsg,
          } = this.state
          const inputType = showPassword ? 'text' : 'password'
          return (
            <Container isDarkTheme={isDarkTheme}>
              <Container2 isDarkTheme={isDarkTheme}>
                <Image src={imageUrl} alt="website logo" />
                <Form onSubmit={this.onClickLogin}>
                  <Div>
                    <Label isDarkTheme={!isDarkTheme} htmlFor="username">
                      USERNAME
                    </Label>
                    <Input
                      type="text"
                      id="username"
                      placeholder="Username"
                      value={usernameIp}
                      onChange={this.onChangeUsername}
                    />
                  </Div>
                  <Div>
                    <Label isDarkTheme={!isDarkTheme} htmlFor="password">
                      PASSWORD
                    </Label>
                    <Input
                      type={inputType}
                      id="password"
                      placeholder="Password"
                      value={passwordIp}
                      onChange={this.onChangePassword}
                    />
                  </Div>
                  <Div checkbox>
                    <Input
                      checkbox
                      id="checkbox"
                      type="checkbox"
                      checked={showPassword}
                      onChange={this.onChangeCheckbox}
                    />
                    <Label
                      htmlFor="checkbox"
                      isDarkTheme={!isDarkTheme}
                      checkbox
                    >
                      Show Password
                    </Label>
                  </Div>
                  <Button type="submit">Login</Button>
                  {showErrorMsg && <ErrorMsg>*{errorMsg}</ErrorMsg>}
                </Form>
              </Container2>
            </Container>
          )
        }}
      </BlackNWhiteContext.Consumer>
    )
  }
}

export default Login
