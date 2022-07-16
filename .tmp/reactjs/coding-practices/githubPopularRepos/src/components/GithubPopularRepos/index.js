import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopulatRepos extends Component {
  state = {
    activeLanguageFilterId: languageFiltersData[0].id,
    requestList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getAPIRequest()
  }

  updateActiveLanguage = id => {
    this.setState(
      {
        activeLanguageFilterId: id,
      },
      this.getAPIRequest,
    )
  }

  getAPIRequest = async () => {
    const {activeLanguageFilterId} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguageFilterId}`

    const response = await fetch(url)
    const data = await response.json()

    console.log(data.popular_repos)
    if (response.ok) {
      const updatedData = data.popular_repos.map(each => ({
        avatarUrl: each.avatar_url,
        forksCount: each.forks_count,
        id: each.id,
        issuesCount: each.issues_count,
        name: each.name,
        starsCount: each.stars_count,
      }))
      this.setState({
        requestList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLanguageFilterItem = () => {
    const {activeLanguageFilterId} = this.state
    return (
      <div>
        <ul className="unordered-list">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              key={each.id}
              each={each}
              updateActiveLanguage={this.updateActiveLanguage}
              isButtonActive={activeLanguageFilterId === each.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderRepositoryItems = () => {
    const {requestList} = this.state
    return (
      <ul className="unordered-list2">
        {requestList.map(each => (
          <RepositoryItem key={each.id} each={each} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="main-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1>Some Thing Went Wrong</h1>
    </div>
  )

  renderLoader = () => (
    <div testId="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepository = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoryItems()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-container">
        <h1 className="main-heading">Popular</h1>
        <div>{this.renderLanguageFilterItem()}</div>
        <div>{this.renderRepository()}</div>
      </div>
    )
  }
}

export default GithubPopulatRepos
