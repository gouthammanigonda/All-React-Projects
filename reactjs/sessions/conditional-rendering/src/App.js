import {Component} from 'react'

import Welcome from './components/Welcome'

import './App.css'

class App extends Component {
  state = {
    isLoggedIn: true,
  }

  render() {
    return (
      <div className="container">
        <Welcome greeting="Hello" name="User" />
        <button>Login</button>
        <button>Logout</button>
      </div>
    )
  }
}

export default App
