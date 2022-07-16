// Write your code here
import './index.css'

const ActiveEventRegistrationDetails = props => {
  const {registrationStatus} = props

  const renderInitialView = () => (
    <p className="initial-view">
      Click on an event, to view its registration details
    </p>
  )

  const renderYetToRegisterView = () => (
    <div className="yet-to-register">
      <img
        src="https://assets.ccbp.in/frontend/react-js/events-register-img.png"
        alt="yet to register"
        className="yet-to-image"
      />
      <p className="yet-to-para">
        A live performance brings so much to your relationship with dance
      </p>
      <button type="button" className="button">
        Register Here
      </button>
    </div>
  )

  const renderRegisteredView = () => (
    <div className="registered">
      <img
        src="https://assets.ccbp.in/frontend/react-js/events-regestered-img.png"
        alt="registered"
        className="registered-image"
      />
      <h1 className="registered-heading">
        You have already registered for the event
      </h1>
    </div>
  )

  const renderRegistrationsClosed = () => (
    <div className="register-closed">
      <img
        src="https://assets.ccbp.in/frontend/react-js/events-registrations-closed-img.png"
        alt="registrations closed"
        className="closed-image"
      />
      <h1 className="registered-heading">Registrations Are Closed Now! </h1>
      <p className="registered-para">Stay tuned. We will reopen</p>
    </div>
  )

  const renderViews = () => {
    switch (registrationStatus) {
      case 'YET_TO_REGISTER':
        return renderYetToRegisterView()
      case 'REGISTERED':
        return renderRegisteredView()
      case 'REGISTRATIONS_CLOSED':
        return renderRegistrationsClosed()
      default:
        return renderInitialView()
    }
  }

  return <div className="event-results">{renderViews()}</div>
}

export default ActiveEventRegistrationDetails
