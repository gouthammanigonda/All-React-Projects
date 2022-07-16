// FIX1: Switch component should be imported from react-router-dom before using it
import {Route, Switch} from 'react-router-dom'

import Header from './components/Header'
import About from './components/About'
import Home from './components/Home'
import Contact from './components/Contact'
import BlogItemDetails from './components/BlogItemDetails'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <div className="app-container">
    <div className="responsive-container">
      {/* FIX2: Header should be placed outside the Switch component */}
      <Header />
      <div className="app-body">
        <Switch>
          {/* FIX3: When "/" is provided in URL path, then the Home component should be displayed */}
          <Route exact path="/" component={Home} />
          {/* FIX4: About Route should consist of "/about" in URL path */}
          <Route exact path="/about" component={About} />
          {/* FIX5: When "/contact" is provided in URL path, then the Contact component should be displayed */}
          <Route exact path="/contact" component={Contact} />
          {/* FIX6: When mentioning path parameters for a route we need to use ":" before the variable */}
          <Route path="/blogs/:id" component={BlogItemDetails} />
          {/* FIX7: NotFound component should be at last  */}
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  </div>
)

export default App
