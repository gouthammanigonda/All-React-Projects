import {Route, Switch} from 'react-router-dom'
import Home from './components/Home'

const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </>
)

export default App
