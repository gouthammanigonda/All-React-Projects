import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {SiYoutubegaming} from 'react-icons/si'
import Header from '../Header'
import SideBar from '../SideBar'
import FailureView from '../FailureView'
import LoaderView from '../LoaderView'
import BlackAndWhiteContext from '../../BandWContext/BlackAndWhiteContext'
import {
  MainContainer,
  GamingContainer,
  Container1,
  Icon,
  Heading,
  Container2,
  ListItem,
  Image,
  Heading2,
  Para,
  TestDiv,
} from './styled'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {
    gamingList: [],
    apiState: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    this.setState({apiState: apiStatusConstants.inProgress})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.videos.map(each => ({
        id: each.id,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
      }))
      this.setState({
        gamingList: updatedData,
        apiState: apiStatusConstants.success,
      })
    } else {
      this.setState({apiState: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {gamingList} = this.state
    return (
      <BlackAndWhiteContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          return (
            <div>
              <Container1 isDarkTheme={isDarkTheme}>
                <Icon isDarkTheme={isDarkTheme}>
                  <SiYoutubegaming color="#ff0b37" className="icon" />
                </Icon>
                <Heading isDarkTheme={isDarkTheme}>Gaming Videos</Heading>
              </Container1>
              <Container2 isDarkTheme={isDarkTheme}>
                {gamingList.map(each => {
                  const {id, thumbnailUrl, title, viewCount} = each
                  return (
                    <Link to={`/videos/${id}`} className="link">
                      <ListItem key={id}>
                        <Image src={thumbnailUrl} alt="video thumbnail" />

                        <Heading2 isDarkTheme={!isDarkTheme}>{title}</Heading2>
                        <Para
                          isDarkTheme={!isDarkTheme}
                        >{`${viewCount} Watching Worldwide`}</Para>
                      </ListItem>
                    </Link>
                  )
                })}
              </Container2>
            </div>
          )
        }}
      </BlackAndWhiteContext.Consumer>
    )
  }

  onReset = () => {
    this.getGamingVideos()
  }

  renderFailureView = () => <FailureView onReset={this.onReset} />

  renderLoadingView = () => <LoaderView />

  renderViews = () => {
    const {apiState} = this.state
    switch (apiState) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <BlackAndWhiteContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          return (
            <TestDiv isDarkTheme={isDarkTheme} data-testid="gaming">
              <Header />
              <MainContainer>
                <SideBar />
                <GamingContainer isDarkTheme={isDarkTheme}>
                  {this.renderViews()}
                </GamingContainer>
              </MainContainer>
            </TestDiv>
          )
        }}
      </BlackAndWhiteContext.Consumer>
    )
  }
}

export default Gaming
