// Write your JS code here
import {Component} from 'react'
import './index.css'

class RegistrationForm extends Component {
  state = {
    inputFirstName: '',
    inputLastName: '',
    showInputElements: true,
    showErrorMsgFirstName: false,
    showErrorMsgSecondName: false,
  }

  onBlurEventFirstname = event => {
    const ipValue = event.target.value
    if (ipValue === '') {
      this.setState({
        showErrorMsgFirstName: true,
      })
    } else {
      this.setState({
        showErrorMsgFirstName: false,
      })
    }
  }

  onBlurEventLastname = event => {
    const ipValue = event.target.value
    if (ipValue === '') {
      this.setState({
        showErrorMsgSecondName: true,
      })
    } else {
      this.setState({
        showErrorMsgSecondName: false,
      })
    }
  }

  onClickSubmitBTN = () => {
    const {inputFirstName, inputLastName} = this.state
    console.log(inputFirstName.length, inputLastName)

    if (inputFirstName !== '' && inputLastName !== '') {
      this.setState({
        showInputElements: false,
      })
    } else {
      this.setState({
        showErrorMsgFirstName: !this.ValidateFirstName(),
        showErrorMsgSecondName: !this.validateLastName(),
        showInputElements: true,
      })
    }
  }

  onClickSubmitAnotherResponse = () => {
    this.setState({
      showInputElements: true,
      inputFirstName: '',
      inputLastName: '',
    })
  }

  onChangeFirstName = event => {
    this.setState({
      inputFirstName: event.target.value,
    })
  }

  onChangeLastName = event => {
    this.setState({
      inputLastName: event.target.value,
    })
  }

  ValidateFirstName = () => {
    const {inputFirstName} = this.state
    return inputFirstName !== ''
  }

  validateLastName = () => {
    const {inputLastName} = this.state
    return inputLastName !== ''
  }

  renderInputElements = () => {
    const {
      inputFirstName,
      inputLastName,
      showErrorMsgFirstName,
      showErrorMsgSecondName,
    } = this.state
    console.log(inputFirstName, inputLastName)
    const classnamefirstname = !showErrorMsgFirstName
      ? 'input'
      : 'input input-error'
    const classnamelastname = showErrorMsgSecondName
      ? 'input input-error'
      : 'input'
    return (
      <div>
        <div className="sub-container1">
          <label htmlFor="firstname">FIRST NAME</label>
          <input
            id="firstname"
            type="text"
            className={classnamefirstname}
            placeholder="First name"
            value={inputFirstName}
            onBlur={this.onBlurEventFirstname}
            onChange={this.onChangeFirstName}
          />
          {!showErrorMsgFirstName ? null : (
            <p className="error-text">*Required</p>
          )}
        </div>
        <div className="sub-container1">
          <label htmlFor="lastname">LAST NAME</label>
          <input
            id="lastname"
            type="text"
            value={inputLastName}
            className={classnamelastname}
            placeholder="Last name"
            onBlur={this.onBlurEventLastname}
            onChange={this.onChangeLastName}
          />
          {showErrorMsgSecondName ? (
            <p className="error-text">*Required</p>
          ) : null}
        </div>
        <div>
          <button
            className="button"
            type="button"
            onClick={this.onClickSubmitBTN}
          >
            Submit
          </button>
        </div>
      </div>
    )
  }

  renderSuccessMessage = () => (
    <div>
      <div className="success-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
          alt="success"
          className="success-img"
        />
        <p>Submitted Successfully</p>
        <div>
          <button
            className="button"
            type="button"
            onClick={this.onClickSubmitAnotherResponse}
          >
            Submit Another Response
          </button>
        </div>
      </div>
    </div>
  )

  render() {
    const {showInputElements} = this.state
    return (
      <div className="container1">
        <h1 className="heading">Registration</h1>
        <div className="container2">
          {showInputElements
            ? this.renderInputElements()
            : this.renderSuccessMessage()}
        </div>
      </div>
    )
  }
}

export default RegistrationForm
