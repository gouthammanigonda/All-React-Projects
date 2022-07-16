// Write your code here

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const statusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class CowinDashBoard extends Component {
  state = {
    last7DaysVaccination: [],
    vaccinationByAge: [],
    vaccinationByGender: [],
    apiStatus: statusConstants.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: statusConstants.inProgress})
    const url = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(url)
    const data = await response.json()

    if (response.ok) {
      const last7DaysVaccination = data.last_7_days_vaccination.map(each => ({
        dose1: each.dose_1,
        dose2: each.dose_2,
        vaccineDate: each.vaccine_date,
      }))
      const vaccinationByAge = data.vaccination_by_age
      const vaccinationByGender = data.vaccination_by_gender
      this.setState({
        last7DaysVaccination,
        vaccinationByAge,
        vaccinationByGender,
        apiStatus: statusConstants.success,
      })
    } else {
      this.setState({apiStatus: statusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="flex-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" width={80} height={80} />
    </div>
  )

  renderFailure = () => (
    <div className="flex-container">
      <h1>Something went wrong</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
    </div>
  )

  renderSuccessView = () => {
    const {
      last7DaysVaccination,
      vaccinationByAge,
      vaccinationByGender,
    } = this.state
    return (
      <div>
        <VaccinationCoverage last7DaysVaccination={last7DaysVaccination} />
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
        <VaccinationByGender vaccinationByGender={vaccinationByGender} />
      </div>
    )
  }

  renderViewBasedOnAPIStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case statusConstants.success:
        return this.renderSuccessView()
      case statusConstants.inProgress:
        return this.renderLoader()
      case statusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    const {apiStatus} = this.state
    console.log(apiStatus)
    return (
      <div className="main-container">
        <div className="sub-container">
          <div className="nav">
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
                alt="website logo"
                className="logo"
              />
            </div>
            <h1 className="main-heading">Co-win</h1>
          </div>
          <h1 className="sub-heading">CoWIN Vaccination in India</h1>
          <div>{this.renderViewBasedOnAPIStatus()}</div>
        </div>
      </div>
    )
  }
}

export default CowinDashBoard
