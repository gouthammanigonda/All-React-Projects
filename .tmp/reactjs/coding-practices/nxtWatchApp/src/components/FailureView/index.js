import BlackAndWhiteContext from '../../BandWContext/BlackAndWhiteContext'
import {FailView, Image, Heading, Para, Button} from './styled'

const FailureView = props => (
  <BlackAndWhiteContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const {onReset} = props
      const imageUrl = !isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
      const Reset = () => {
        onReset()
      }
      return (
        <FailView isDarkTheme={isDarkTheme}>
          <Image src={imageUrl} alt="failure view" />
          <Heading isDarkTheme={isDarkTheme} fail>
            Oops! Something Went Wrong
          </Heading>
          <Para isDarkTheme={isDarkTheme} fail>
            We are having some trouble to complete your request. Please try
            again.
          </Para>
          <Button isDarkTheme={isDarkTheme} fail onClick={Reset}>
            Retry
          </Button>
        </FailView>
      )
    }}
  </BlackAndWhiteContext.Consumer>
)

export default FailureView
