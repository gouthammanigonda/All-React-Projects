import './index.css'

const NotFound = () => (
  <div className="bg-container">
    <div className="not-found">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="not-found-image"
      />
      <h1 className="nf-heading">Page Not Found</h1>
      <p className="nf-para">
        we're sorry, the page you requested could not be found
      </p>
    </div>
  </div>
)

export default NotFound
