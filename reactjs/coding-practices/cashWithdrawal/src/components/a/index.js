import {Component} from 'react'

import './index.css'

class Proj extends Component {
  render() {
    return (
      <div className="main-container">
        <div className="header">
          <h1 className="main-heading">PINGSUIT</h1>
        </div>
        <div className="sub-container">
          <div className="sub-1-container">
            <div>
              <h1 className="heading1">We are commimg soon</h1>
              <p className="para1">PingSuit is getting ready to launch soon!</p>
            </div>
            <p className="para1">
              PingSuite is the new alternative for your website and server
              monitoring. With one platform, you can handle all the following:
            </p>
            <ul className="unordered-list">
              <li className="list-item">
                <p className="list-para">
                  <span className="span-ele">Server Monitoring</span> (Resource
                  usage: RAM, CPU, Disk, Network)
                </p>
              </li>
              <li className="list-item">
                <p className="list-para">
                  <span className="span-ele">Uptime Monitoring</span>{' '}
                  (HTTP/TCP/UDP/Ping/DNS/SSL)
                </p>
              </li>
              <p>etc...</p>
            </ul>
            <p className="para1">Let me know when PingSuite launches:</p>
            <div>
              <input
                type="text"
                placeholder="Email Address"
                className="input"
              />
              <button type="button" className="button">
                Notify Me
              </button>
            </div>
          </div>
          <div className="sub-2-container">
            <div className="services-container">
              <div className="flex-item-ul">
                <ul className="ul-2">
                  <li>
                    <img alt="img1" />
                    <h1>Server Monitering</h1>
                  </li>
                  <li>
                    <img alt="img2" />
                    <h1>Web Monitering</h1>
                  </li>
                  <li>
                    <img alt="img2" />
                    <h1>Web Monitering</h1>
                  </li>
                  <li>
                    <img alt="img2" />
                    <h1>Web Monitering</h1>
                  </li>
                  <li>
                    <img alt="img2" />
                    <h1>Web Monitering</h1>
                  </li>
                  <li>
                    <img alt="img2" />
                    <h1>Web Monitering</h1>
                  </li>
                </ul>
              </div>
              <p className="para-last">many more...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Proj
