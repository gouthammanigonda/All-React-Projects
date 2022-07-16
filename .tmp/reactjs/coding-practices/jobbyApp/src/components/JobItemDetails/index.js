/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {GiSuitcase} from 'react-icons/gi'
import {BiLinkExternal} from 'react-icons/bi'
import Header from '../Header'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetails: [],
    skills: [],
    lifeAtCompany: [],
    similarJobs: [],
    retry: false,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const lifeAtCompany = {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }
      const skills = data.job_details.skills.map(each => ({
        imageUrl: each.image_url,
        name: each.name,
      }))
      const jobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }

      const similarJobs = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobDetails,
        skills,
        lifeAtCompany,
        similarJobs,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoaderView = () => (
    <div testid="loader" className="loader-failure-container">
      <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
    </div>
  )

  onClickRetryBTN = () => {
    this.getJobDetails()
  }

  renderFailureView = () => (
    <div className="loader-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-job-item-image"
      />
      <h1 className="not-found-heading">Oops! Something Went Wrong</h1>
      <p className="not-found-para">
        We cannot seem to find the page you are looking for
      </p>
      <button className="retry" type="button" onClick={this.onClickRetryBTN}>
        Retry
      </button>
    </div>
  )

  renderJobItems = () => {
    const {jobDetails, skills, lifeAtCompany, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails

    return (
      <div className="each-job-main-container">
        <div className="each-job-container">
          <div className="header-content">
            <div className="header1">
              <div>
                <img
                  src={companyLogoUrl}
                  alt="job details company logo"
                  className="company-img"
                />
              </div>
              <div className="title-rating-container">
                <h1 className="title">{title}</h1>
                <div className="iconstar-rating-container">
                  <AiFillStar className="star" />
                  <p className="rating">{rating}</p>
                </div>
              </div>
            </div>
            <div className="header2">
              <div className="location-employmentType-container gap">
                <div className="location-container">
                  <MdLocationOn className="header2-icon" />
                  <p className="header2-text">{location}</p>
                </div>
                <div className="location-container">
                  <GiSuitcase className="header2-icon" />
                  <p className="header2-text">{employmentType}</p>
                </div>
              </div>
              <p className="package">{packagePerAnnum}</p>
            </div>
          </div>
          <hr className="hr-line" />
          <div className="description-container">
            <div className="job-description-header">
              <h1 className="skills-heading">Description</h1>
              <div className="link-container">
                <a
                  href={companyWebsiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="anchor-ele"
                >
                  Visit
                  <BiLinkExternal className="link-icon" />
                </a>
              </div>
            </div>

            <p className="description-para job-item-para">{jobDescription}</p>
          </div>
          <div className="skills-main-container">
            <h1 className="skills-heading">Skills</h1>
            <ul className="skills-container">
              {skills.map(each => (
                <li key={each.name} className="each-skill-container">
                  <img
                    src={each.imageUrl}
                    alt={each.name}
                    className="skills-image"
                  />
                  <p className="skill-para">{each.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="life-at-company">
            <h1 className="skills-heading">Life at Company</h1>
            <div className="life-at-company-sub-container">
              <div className="para-box">
                <p className="lac-para">{lifeAtCompany.description}</p>
              </div>
              <div className="image-box">
                <img
                  src={lifeAtCompany.imageUrl}
                  alt="life at company"
                  className="life-at-company-image"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="similar-jobs-main-container">
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-jobs-container">
            {similarJobs.map(each => (
              <li key={each.id} className="each-similar-job">
                <div className="header1">
                  <div>
                    <img
                      src={each.companyLogoUrl}
                      alt="similar job company logo"
                      className="company-img"
                    />
                  </div>
                  <div className="title-rating-container">
                    <h1 className="title">{each.title}</h1>
                    <div className="iconstar-rating-container">
                      <AiFillStar className="star" />
                      <p className="rating">{each.rating}</p>
                    </div>
                  </div>
                </div>
                <h1 className="final-heading">Description</h1>
                <p className="final-para">{each.jobDescription}</p>
                <div className="final-conatiner">
                  <div className="each-final">
                    <MdLocationOn className="header2-icon" />
                    <p className="last-para">{each.location}</p>
                  </div>
                  <div className="each-final">
                    <GiSuitcase className="header2-icon" />
                    <p className="last-para">{each.employmentType}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderJobItems()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <Header />
        <div className="job-item-details-container">{this.renderViews()}</div>
      </div>
    )
  }
}

export default JobItemDetails
