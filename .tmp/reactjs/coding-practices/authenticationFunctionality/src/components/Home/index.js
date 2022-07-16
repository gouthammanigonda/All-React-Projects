// Write your JS code here
import Header from '../Header'
import Logout from '../LogoutButton'
import './index.css'

const Home = () => (
  <div className="container">
    <Header />
    <h1>Home Route</h1>
    <Logout />
  </div>
)

export default Home
