import {Component} from 'react'
import {v4} from 'uuid'
import './App.css'

class App extends Component {
  state = {
    inputList: [],
    websiteip: '',
    usernameip: '',
    passwordip: '',
    searchIp: '',
    showPassword: false,
  }

  renderNoPasswordView = () => (
    <div className="interface1">
      <img
        className="image2"
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
      />
      <p className="para2">No Passwords</p>
    </div>
  )

  renderPasswordView = () => {
    const {inputList, searchIp} = this.state
    const result = inputList.filter(each =>
      each.website.toLowerCase().includes(searchIp),
    )

    return (
      <ul className="unordered-list">
        {result.map(each => {
          const {username, password, website, id, bgColor} = each
          const firstLetter = website[0]

          const {showPassword} = this.state
          const maskedPassword = () => (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="masked-img"
            />
          )
          const passwordText = () => <p className="text">{password}</p>
          const onClickDelete = () => {
            const filteredList = inputList.filter(eachip => eachip.id !== id)
            this.setState({
              inputList: filteredList,
            })
          }

          const style = {
            backgroundColor: bgColor,
          }

          return (
            <li key={id} className="listitem">
              <div className="textcontainer">
                <div className="textsubcontainer">
                  <div>
                    <div style={style} className="icon">
                      <h1 className="icontext">{firstLetter}</h1>
                    </div>
                  </div>

                  <div className="texts">
                    <p className="text">{website}</p>
                    <p className="text">{username}</p>

                    {showPassword ? passwordText() : maskedPassword()}
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  className="itemBtn"
                  onClick={onClickDelete}
                  testid="delete"
                >
                  <img
                    className="delete-img"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png "
                    alt="delete"
                  />
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    )
  }

  onSubmitEvent = event => {
    event.preventDefault()
    const {websiteip, usernameip, passwordip} = this.state
    const color = [
      '#0b69ff',
      '#94a3b8',
      '#b6c3ca',
      '#f59e0b',
      '#10b981',
      '#f97316',
      '#14b8a6',
      '#b91c1c',
    ]
    const random = Math.floor(Math.random() * 9)
    const eachColor = color[random]
    const newList = {
      id: v4(),
      website: websiteip,
      username: usernameip,
      password: passwordip,
      bgColor: eachColor,
    }

    this.setState(prevState => ({
      inputList: [...prevState.inputList, newList],
      websiteip: '',
      usernameip: '',
      passwordip: '',
    }))
  }

  onChangeWebsiteIp = event => {
    this.setState({
      websiteip: event.target.value,
    })
  }

  onChangeUsernameIp = event => {
    this.setState({
      usernameip: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      passwordip: event.target.value,
    })
  }

  onChangeCheckBox = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  onChangeSearchIp = event => {
    const searchIp = event.target.value.toLowerCase()
    this.setState({
      searchIp,
    })
  }

  render() {
    const {
      websiteip,
      usernameip,
      passwordip,
      inputList,
      showPassword,
      searchIp,
    } = this.state
    const result = inputList.filter(each =>
      each.website.toLowerCase().includes(searchIp),
    )

    return (
      <div className="container1">
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            className="bg-image"
            alt="app logo"
          />
        </div>
        <div className="container2">
          <div>
            <form className="form" onSubmit={this.onSubmitEvent}>
              <h1 className="form-heading">Add New Password</h1>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="form-img"
                />
                <input
                  type="text"
                  className="input"
                  value={websiteip}
                  placeholder="Enter Website"
                  onChange={this.onChangeWebsiteIp}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                  alt="username"
                  className="form-img"
                />
                <input
                  type="text"
                  className="input"
                  value={usernameip}
                  placeholder="Enter Username"
                  onChange={this.onChangeUsernameIp}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="form-img"
                />
                <input
                  type="password"
                  className="input"
                  value={passwordip}
                  placeholder="Enter Password"
                  onChange={this.onChangePassword}
                />
              </div>
              <div className="button-container">
                <button className="button" type="submit">
                  Add
                </button>
              </div>
            </form>
          </div>

          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              className="image"
              alt="password manager"
            />
          </div>
        </div>

        <div className="container3">
          <div className="headerSection">
            <div className="header">
              <h1 className="heading2">Your Passwords</h1>

              <p className="para">{inputList.length}</p>
            </div>
            <div>
              <div className="search-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png "
                  className="search-img"
                  alt="search"
                />
                <input
                  className="input"
                  type="search"
                  placeholder="search"
                  onChange={this.onChangeSearchIp}
                />
              </div>
            </div>
          </div>
          <hr className="hr-line" />
          <div className="check-box-container">
            <div className="sub-container-checkbox">
              <input
                className="check-box"
                checked={showPassword}
                type="checkbox"
                id="checkbox"
                onChange={this.onChangeCheckBox}
              />
              <label htmlFor="checkbox" className="check-box-heading">
                Show Passwords
              </label>
            </div>
          </div>
          <ul className="unorderedlist">
            {result.length !== 0
              ? this.renderPasswordView()
              : this.renderNoPasswordView()}
          </ul>
        </div>
      </div>
    )
  }
}

export default App
