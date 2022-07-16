import {Link, withRouter} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => {
  const onClickFindJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }
  return (
    <div className="bg-container-home">
      <Header />
      <div className="home">
        <div className="home-container">
          <ul className="home-content">
            <li className="list-item">
              <h1 className="content-main-heading">
                Find The Job That Fits Your Life
              </h1>
            </li>
            <li className="list-item">
              <p className="content-para">
                Millions of people are searching for jobs, salary, information,
                company reviews. Find the job that fits your ability and
                potential.
              </p>
            </li>
            <li className="list-item">
              <Link to="/jobs">
                <button type="button" className="form-button content-btn">
                  Find Jobs
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Home)
