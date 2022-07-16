import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {VscDebugStackframeDot} from 'react-icons/vsc'
import {HiFire} from 'react-icons/hi'
import {formatDistanceToNow} from 'date-fns'
import Header from '../Header'
import SideBar from '../SideBar'
import FailureView from '../FailureView'
import LoaderView from '../LoaderView'
import BlackAndWhiteContext from '../../BandWContext/BlackAndWhiteContext'
import {
  MainContainer,
  TrendingContainer,
  Container2,
  Container1,
  Icon,
  Heading,
  ListItem,
  Image,
  Div2,
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

class Trending extends Component {
  state = {
    trendingList: [],
    apiState: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({apiState: apiStatusConstants.inProgress})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
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
        channel: each.channel,
        id: each.id,
        publishedAt: formatDistanceToNow(new Date(each.published_at)),
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
      }))
      this.setState({
        trendingList: updatedData,
        apiState: apiStatusConstants.success,
      })
      console.log(data)
    } else {
      this.setState({apiState: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {trendingList} = this.state
    return (
      <BlackAndWhiteContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          return (
            <div>
              <Container1 isDarkTheme={isDarkTheme}>
                <Icon isDarkTheme={isDarkTheme}>
                  <HiFire color="#ff0b37" className="icon" />
                </Icon>
                <Heading isDarkTheme={isDarkTheme}>Trending</Heading>
              </Container1>
              <Container2 isDarkTheme={isDarkTheme}>
                {trendingList.map(each => {
                  const {
                    thumbnailUrl,
                    id,
                    publishedAt,
                    title,
                    channel,
                    viewCount,
                  } = each
                  const {name} = channel

                  return (
                    <Link to={`/videos/${id}`} className="link">
                      <ListItem key={id} isDarkTheme={isDarkTheme}>
                        <Div2>
                          <Image src={thumbnailUrl} alt="video thumbnail" />
                        </Div2>

                        <Div2 flexstart>
                          <Heading2 small isDarkTheme={isDarkTheme}>
                            {title}
                          </Heading2>
                          <Para smaller isDarkTheme={isDarkTheme}>
                            {name}
                          </Para>
                          <Div2 flex>
                            <Para smaller isDarkTheme={isDarkTheme}>
                              {`${viewCount} views`}
                            </Para>
                            <VscDebugStackframeDot
                              color={isDarkTheme ? '#616e7c' : '#7e858e'}
                              className="icon-position"
                            />
                            <Para smaller isDarkTheme={isDarkTheme}>
                              {publishedAt}
                            </Para>
                          </Div2>
                        </Div2>
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
    this.getTrendingVideos()
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
            <TestDiv isDarkTheme={isDarkTheme} data-testid="trending">
              <Header />
              <MainContainer>
                <SideBar />
                <TrendingContainer isDarkTheme={isDarkTheme}>
                  {this.renderViews()}
                </TrendingContainer>
              </MainContainer>
            </TestDiv>
          )
        }}
      </BlackAndWhiteContext.Consumer>
    )
  }
}

export default Trending
