import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import VideoItemDetails from './components/VideoItemDetails'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import ProtectedRoute from './components/ProtectedRoute'
import BlackAndWhiteContext from './BandWContext/BlackAndWhiteContext'
import './App.css'
import NotFound from './components/NotFound'

// Replace your code here
class App extends Component {
  state = {
    isDarkTheme: false,
    saveList: [],
    isSaved: false,
    isSaveBtnActive: false,
  }

  changeTheme = () => {
    this.setState(prevState => ({
      isDarkTheme: !prevState.isDarkTheme,
    }))
  }

  onAddAndRemoveList = (item, id) => {
    this.setState(prevState => ({
      isSaveBtnActive: !prevState.isSaveBtnActive,
    }))
    const {saveList} = this.state

    const present = saveList.filter(each => each.id === id)
    const isSaved = present.length !== 0
    if (present.length === 0) {
      this.setState(prevState => ({
        saveList: [...prevState.saveList, item],
        isSaved,
      }))
    } else {
      const filteredList = saveList.filter(each => each.id !== item.id)
      this.setState({
        saveList: filteredList,
        isSaved,
      })
    }
  }

  render() {
    const {isDarkTheme, saveList, isSaved, isSaveBtnActive} = this.state

    return (
      <BlackAndWhiteContext.Provider
        value={{
          isDarkTheme,
          saveList,
          isSaved,
          isSaveBtnActive,
          changeTheme: this.changeTheme,
          onAddAndRemoveList: this.onAddAndRemoveList,
        }}
      >
        <>
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute
              exact
              path="/videos/:id"
              component={VideoItemDetails}
            />
            <ProtectedRoute
              exact
              path="/saved-videos"
              component={SavedVideos}
            />
            <ProtectedRoute exact path="/trending" component={Trending} />
            <ProtectedRoute exact path="/gaming" component={Gaming} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </>
      </BlackAndWhiteContext.Provider>
    )
  }
}

export default App
