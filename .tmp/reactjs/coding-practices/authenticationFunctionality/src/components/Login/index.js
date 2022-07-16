// Write your JS code here
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect, withRouter} from 'react-router-dom'
import './index.css'

class Login extends Component {
  getAccess = async () => {
    const userDetails = {
      username: 'rahul',
      password: 'rahul@2021',
    }

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const {history} = this.props
      const token = data.jwt_token
      console.log(token)
      Cookies.set('jwt_token', token, {expires: 30})
      history.replace('/')
    }
  }

  render() {
    const JWTtoken = Cookies.get('jwt_token')
    if (JWTtoken !== undefined) {
      ;<Redirect to="/" />
    }
    return (
      <div className="container">
        <h1>Please Login</h1>
        <button type="button" onClick={this.getAccess}>
          Login with sample creds
        </button>
      </div>
    )
  }
}

export default withRouter(Login)
