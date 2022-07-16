// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class Home extends Component {
  state = {
    dataList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getIPLListsApi()
  }

  getIPLListsApi = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const updatedData = data.teams.map(each => ({
      id: each.id,
      name: each.name,
      teamImageUrl: each.team_image_url,
    }))
    this.setState({
      dataList: updatedData,
      isLoading: false,
    })
  }

  renderHomePage = () => {
    const {dataList, isLoading} = this.state
    return (
      <div className="home-container">
        <div className="logo-container">
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png "
            alt="ipl logo"
          />
          <h1 className="home-heading">IPL Dashboard</h1>
        </div>
        <ul className="teamCards">
          {dataList.map(each => (
            <TeamCard key={each.id} each={each} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {dataList, isLoading} = this.state
    return (
      <div className="body">
        <div>
          {isLoading ? (
            <div testId="loader">
              <Loader
                type="BallTriangle"
                color="#00BFFF"
                height={80}
                width={80}
              />
            </div>
          ) : (
            this.renderHomePage()
          )}
        </div>
      </div>
    )
  }
}

export default Home
