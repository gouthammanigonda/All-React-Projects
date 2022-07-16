// Write your JS code here
import {Component} from 'react'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showErrorMessage: false,
    errormsg: '',
  }

  onClickLoginButton = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

    if (response.ok) {
      const {history} = this.props
      history.replace('/')
      this.setState({
        showErrorMessage: false,
        errorMessage: '',
      })
    } else {
      const errorMessage = data.error_msg
      console.log(errorMessage)
      this.setState({
        showErrorMessage: true,
        errormsg: errorMessage,
      })
    }
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  renderShowErrorMsg = () => {
    const {errormsg} = this.state
    return <p className="error">{`*${errormsg}`}</p>
  }

  render() {
    const {showErrorMessage, errormsg} = this.state
    return (
      <div className="Login-container">
        <div className="login-image-container">
          <img
            className="login-image"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
            alt="website login"
          />
        </div>
        <div>
          <form className="login-form" onSubmit={this.onClickLoginButton}>
            <div className="form-image-container">
              <img
                className="logo-image width"
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png "
                alt="website logo"
              />
            </div>
            <div className="input-container">
              <div className="input-sub-container">
                <label className="label" htmlFor="username">
                  USERNAME
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Username"
                  className="input"
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="input-sub-container">
                <label className="label" htmlFor="password">
                  PASSWORD
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="input"
                  onChange={this.onChangePassword}
                />
              </div>
              <button className="button color" type="submit">
                Login
              </button>
              <div>{showErrorMessage ? this.renderShowErrorMsg() : null}</div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
