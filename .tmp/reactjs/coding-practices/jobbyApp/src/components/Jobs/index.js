import {Component} from 'react'
import Cookies from 'js-cookie'
import {RiSearchLine} from 'react-icons/ri'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {GiSuitcase} from 'react-icons/gi'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStateConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    employmentType: [],
    salaryRange: '',
    searchIp: '',
    isSearchIconClicked: false,
    profileDetails: '',
    jobsList: [],
    apiStatusProfile: apiStateConstants.initial,
    apiStatusJobs: apiStateConstants.initial,
    retry: false,
  }

  componentDidMount() {
    this.getJobs()
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatusProfile: apiStateConstants.inProgress})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        apiStatusProfile: apiStateConstants.success,
      })
    } else {
      this.setState({apiStatusProfile: apiStateConstants.failure})
    }
  }

  getJobs = async () => {
    this.setState({apiStatusJobs: apiStateConstants.inProgress})
    const {salaryRange, employmentType, searchIp} = this.state
    const token = Cookies.get('jwt_token')
    const editedEmploymentType = employmentType.join(',')
    const url = `https://apis.ccbp.in/jobs?employment_type=${editedEmploymentType}&minimum_package=${salaryRange}&search=${searchIp}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const fetchedData = await response.json()

      const updatedData = fetchedData.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        jobsList: updatedData,
        apiStatusJobs: apiStateConstants.success,
      })
    } else {
      this.setState({apiStatusJobs: apiStateConstants.failure})
    }
  }

  onUpdateEmployeeType = (isChecked, id) => {
    const {employmentType} = this.state
    if (isChecked) {
      this.setState(
        {
          employmentType: [...employmentType, id],
        },
        this.getJobs,
      )
    } else {
      const updatedEmployeType = employmentType.filter(each => each !== id)
      this.setState(
        {
          employmentType: [...updatedEmployeType],
        },
        this.getJobs,
      )
    }
  }

  updateSalaryRange = (isChecked, id) => {
    if (isChecked) {
      this.setState({salaryRange: id}, this.getJobs)
    }
  }

  renderTypeOfEmployment = () => (
    <ul className="filter-container">
      <h1 className="filter-heading">Type of Employment</h1>
      {employmentTypesList.map(each => {
        const onChangeCheckbox = event => {
          const isChecked = event.target.checked
          this.onUpdateEmployeeType(isChecked, each.employmentTypeId)
        }

        return (
          <li className="input-filter-container" key={each.employmentTypeId}>
            <input
              type="checkbox"
              id={each.employmentTypeId}
              className="checkbox"
              onChange={onChangeCheckbox}
            />
            <label htmlFor={each.employmentTypeId} className="filter-text">
              {each.label}
            </label>
          </li>
        )
      })}
    </ul>
  )

  renderSalaryRange = () => (
    <ul className="filter-container">
      <h1 className="filter-heading">Salary Range</h1>
      {salaryRangesList.map(each => {
        const onChangeRadiobtn = event => {
          const isChecked = event.target.checked
          this.updateSalaryRange(isChecked, each.salaryRangeId)
        }
        return (
          <li className="input-filter-container" key={each.salaryRangeId}>
            <input
              type="radio"
              id={each.salaryRangeId}
              name="salaryrange"
              value={each.salaryRangeId}
              className="radio"
              onChange={onChangeRadiobtn}
            />
            <label htmlFor={each.salaryRangeId} className="filter-text">
              {each.label}
            </label>
          </li>
        )
      })}
    </ul>
  )

  onClickSearchIcon = () => {
    this.setState(
      prevState => ({
        isSearchIconClicked: !prevState.isSearchIconClicked,
      }),
      this.getJobs,
    )
  }

  onChangeSearchInput = event => {
    this.setState({
      searchIp: event.target.value,
    })
  }

  renderLoadingView = () => (
    <div testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderJobsView = () => {
    const {jobsList} = this.state
    const renderJobsIfLengthGreaterThanOne = () =>
      jobsList.map(each => {
        const {
          companyLogoUrl,
          employmentType,
          id,
          jobDescription,
          location,
          packagePerAnnum,
          rating,
          title,
        } = each
        return (
          <li key={id} className="each-filtered-result">
            <Link to={`/jobs/${id}`} className="link-style">
              <div className="header-content">
                <div className="header1">
                  <div>
                    <img
                      src={companyLogoUrl}
                      alt="company logo"
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
                  <div className="location-employmentType-container">
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
                <h1 className="description">Description</h1>
                <p className="description-para">{jobDescription}</p>
              </div>
            </Link>
          </li>
        )
      })

    const renderIfJobListIs0 = () => (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
          alt="no jobs"
          className="no-jobs-image"
        />
        <h1 className="description">No Jobs Found</h1>
        <p className="description-para">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )

    return (
      <ul className="filter-results-container">
        {jobsList.length > 1
          ? renderJobsIfLengthGreaterThanOne()
          : renderIfJobListIs0()}
      </ul>
    )
  }

  renderProfileComponent = () => {
    const {profileDetails} = this.state
    return (
      <div className="profile-container">
        <img
          src={profileDetails.profileImageUrl}
          alt="profile"
          className="profile-logo"
        />
        <h1 className="profile-heading">{profileDetails.name}</h1>
        <p className="profile-description">{profileDetails.shortBio}</p>
      </div>
    )
  }

  onClickRetryBTN = () => {
    this.getProfileDetails()
  }

  renderProfileFailureView = () => (
    <div className="failure-view">
      <button className="retry" type="button" onClick={this.onClickRetryBTN}>
        Retry
      </button>
    </div>
  )

  renderProfile = () => {
    const {apiStatusProfile} = this.state
    switch (apiStatusProfile) {
      case apiStateConstants.success:
        return this.renderProfileComponent()
      case apiStateConstants.inProgress:
        return this.renderLoadingView()
      case apiStateConstants.failure:
        return this.renderProfileFailureView()
      default:
        return null
    }
  }

  onClickRetryJobs = () => {
    this.getJobs()
  }

  renderJobsFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-failure-view-image"
      />
      <h1 className="description">Oops! Something Went Wrong</h1>
      <p className="description-para">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="retry" onClick={this.onClickRetryJobs}>
        Retry
      </button>
    </div>
  )

  renderJobs = () => {
    const {apiStatusJobs} = this.state
    switch (apiStatusJobs) {
      case apiStateConstants.inProgress:
        return this.renderLoadingView()
      case apiStateConstants.success:
        return this.renderJobsView()
      case apiStateConstants.failure:
        return this.renderJobsFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <Header />
        <div className="jobs">
          <div className="jobs-container">
            <div className="section1">
              {this.renderProfile()}
              <hr className="hr-line" />
              {this.renderTypeOfEmployment()}
              <hr className="hr-line" />
              {this.renderSalaryRange()}
            </div>
            <div className="section2">
              <div className="sub-container-section2">
                <div className="filter-search-container">
                  <input
                    type="search"
                    placeholder="search"
                    id="search-filter"
                    className="search-filter"
                    onChange={this.onChangeSearchInput}
                  />
                  <button
                    testid="searchButton"
                    type="button"
                    htmlFor="search-filter"
                    className="search-label"
                    onClick={this.onClickSearchIcon}
                  >
                    <RiSearchLine size={25} className="search-icon" />
                  </button>
                </div>
                {this.renderJobs()}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
