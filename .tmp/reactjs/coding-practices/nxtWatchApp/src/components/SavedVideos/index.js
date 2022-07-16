import {Component} from 'react'
import {HiFire} from 'react-icons/hi'
import {Link} from 'react-router-dom'
import {VscDebugStackframeDot} from 'react-icons/vsc'

import Header from '../Header'
import SideBar from '../SideBar'

import BlackAndWhiteContext from '../../BandWContext/BlackAndWhiteContext'
import {
  MainContainer,
  Div,
  Container2,
  Container1,
  Icon,
  Heading,
  ListItem,
  Image,
  Div2,
  Heading2,
  Para,
  NoResult,
  SaveListContainer,
  TestDiv,
} from './styled'

class SavedVideos extends Component {
  renderResult = () => (
    <BlackAndWhiteContext.Consumer>
      {value => {
        const {isDarkTheme, saveList} = value

        return (
          <Div isDarkTheme={isDarkTheme}>
            <Container1 isDarkTheme={isDarkTheme}>
              <Icon isDarkTheme={isDarkTheme}>
                <HiFire color="#ff0b37" className="icon" />
              </Icon>
              <Heading isDarkTheme={isDarkTheme}>Saved Videos</Heading>
            </Container1>
            <Container2 isDarkTheme={isDarkTheme}>
              {saveList.map(each => {
                const {
                  thumbnailUrl,
                  id,
                  publishedAt,
                  title,
                  name,

                  viewCount,
                } = each

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
          </Div>
        )
      }}
    </BlackAndWhiteContext.Consumer>
  )

  renderNoResultsView = () => (
    <BlackAndWhiteContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <NoResult isDarkTheme={isDarkTheme}>
            <Image
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              alt="no saved videos"
            />
            <Heading small isDarkTheme={isDarkTheme}>
              No saved videos found
            </Heading>
            <Para margin smaller isDarkTheme={isDarkTheme}>
              You can save your videos while watching them
            </Para>
          </NoResult>
        )
      }}
    </BlackAndWhiteContext.Consumer>
  )

  render() {
    return (
      <BlackAndWhiteContext.Consumer>
        {value => {
          const {saveList, isDarkTheme} = value

          return (
            <TestDiv isDarkTheme={isDarkTheme} data-testid="savedVideos">
              <Header />
              <MainContainer>
                <SideBar />
                <SaveListContainer isDarkTheme={isDarkTheme}>
                  {saveList.length !== 0
                    ? this.renderResult()
                    : this.renderNoResultsView()}
                </SaveListContainer>
              </MainContainer>
            </TestDiv>
          )
        }}
      </BlackAndWhiteContext.Consumer>
    )
  }
}

export default SavedVideos
