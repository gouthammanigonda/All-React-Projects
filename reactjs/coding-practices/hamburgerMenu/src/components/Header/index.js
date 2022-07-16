// Write your code here
import {Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillHome} from 'react-icons/ai'
import {IoMdClose} from 'react-icons/io'
import {BsInfoCircleFill} from 'react-icons/bs'
import './index.css'

const Header = () => {
  const renderPopup = () => (
    <div className="popup-container">
      <div className="">
        <Link to="/">
          <div className="flex-icon">
            <AiFillHome className="react-icon2" />
            <h1 className="icon-heading">Home</h1>
          </div>
        </Link>
        <Link to="/about">
          <div className="flex-icon">
            <BsInfoCircleFill className="react-icon2" />
            <h1 className="icon-heading">About</h1>
          </div>
        </Link>
      </div>
    </div>
  )

  return (
    <div className="header-container">
      <div className="header-content">
        <img
          src="https://assets.ccbp.in/frontend/react-js/hamburger-menu-website-logo.png "
          alt="website logo"
          className="logo1"
        />

        <Popup
          modal
          trigger={
            <button className="button" type="button">
              <GiHamburgerMenu className="react-icon" />
            </button>
          }
        >
          {close => (
            <>
              <div className="model-container">
                <button
                  className="button close"
                  type="button"
                  testid="hamburgerIconButton"
                  onClick={() => close()}
                >
                  <IoMdClose className="react-icon" />
                </button>
                {renderPopup()}
              </div>
            </>
          )}
        </Popup>
      </div>
    </div>
  )
}

export default Header
