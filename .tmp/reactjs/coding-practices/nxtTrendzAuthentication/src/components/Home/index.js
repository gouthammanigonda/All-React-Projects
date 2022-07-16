// Write your JS code here
import Header from '../Header'
import './index.css'

const Home = () => (
  <div className="main-container">
    <div className="nav">
      <Header />
    </div>
    <div className="content-container">
      <div className="content">
        <h1 className="content-heading">Clothes That Get YOU Noticed</h1>
        <p className="content-para">
          Fashion is part of the daily air and it doesn't help quite that, it
          changes all time .Clothes have always been a mark of era and we are in
          the Revolution. Your fashion makes you have been and heard that way
          you are . So, celebrate this season new and exciting fashion in your
          way own.
        </p>
        <div>
          <button type="button" className="button">
            Shop Now
          </button>
        </div>
      </div>
      <div className="image-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
          alt="clothes that get you noticed"
        />
      </div>
    </div>
  </div>
)

export default Home
