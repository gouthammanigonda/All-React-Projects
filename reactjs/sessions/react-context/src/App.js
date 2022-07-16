import {Component} from 'react'

import Header from './components/Header'
import LandingSection from './components/LandingSection'
import FeaturesSection from './components/FeaturesSection'

class App extends Component {
  state = {activeLanguage: 'EN'}

  changeLanguage = activeLanguage => {
    this.setState({activeLanguage})
  }

  render() {
    const {activeLanguage} = this.state
    return (
      <>
        <Header />
        <LandingSection activeLanguage={activeLanguage} />
        <FeaturesSection activeLanguage={activeLanguage} />
      </>
    )
  }
}

export default App
