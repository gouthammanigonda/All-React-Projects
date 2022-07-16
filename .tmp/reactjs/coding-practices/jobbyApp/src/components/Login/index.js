import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    usernameIp: '',
    passwordIp: '',
    showErrorMsg: false,
    errorMsg: '',
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

  submitForm = async event => {
    event.preventDefault()
    const {usernameIp, passwordIp} = this.state
    const userdetails = {
      username: usernameIp,
      password: passwordIp,
    }
    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userdetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const {history} = this.props
      const token = data.jwt_token
      Cookies.set('jwt_token', token, {expires: 30})
      this.setState({showErrorMsg: false})
      history.replace('/')
    } else {
      const errorMsg = data.error_msg
      this.setState({
        showErrorMsg: true,
        errorMsg,
      })
    }
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-container">
        <div className="sub-container">
          <form className="form-container" onSubmit={this.submitForm}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
              alt="website logo"
              className="logo"
            />
            <div className="input-container">
              <label htmlFor="username" className="label-text">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                className="input-style"
                placeholder="Username"
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="input-container">
              <label htmlFor="password" className="label-text">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                className="input-style"
                placeholder="Password"
                onChange={this.onChangePassword}
              />
            </div>
            <div className="button-container">
              <button type="submit" className="form-button">
                Login
              </button>
              {showErrorMsg && <p className="error-msg">*{errorMsg}</p>}
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
