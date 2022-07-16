// Write your code here
import './index.css'
import ConfigurationContext from '../../context/ConfigurationContext'

const ConfigurationController = () => (
  <ConfigurationContext.Consumer>
    {value => {
      const {
        onToggleShowContent,
        onToggleShowLeftNavbar,
        onToggleShowRightNavbar,
        showContent,
        showLeftNavbar,
        showRightNavbar,
      } = value
      const onChangeContent = event => {
        onToggleShowContent(event.target.checked)
      }
      const onChangeNavbarLeft = event => {
        onToggleShowLeftNavbar(event.target.checked)
      }
      const onChangeNavbarRight = event => {
        onToggleShowRightNavbar(event.target.checked)
      }
      return (
        <div className="cc-container">
          <div className="cc-sub-container">
            <div className="cc-flex-container">
              <h1 className="cc-heading">Layout</h1>
              <div className="cc-input-ele-container">
                <div className="cc-input-ele">
                  <input
                    type="checkbox"
                    id="content"
                    className="input-ele"
                    onChange={onChangeContent}
                    checked={showContent}
                  />
                  <label htmlFor="content" className="input-label">
                    Content
                  </label>
                </div>
                <div className="cc-input-ele">
                  <input
                    type="checkbox"
                    id="leftnavbar"
                    className="input-ele"
                    onChange={onChangeNavbarLeft}
                    checked={showLeftNavbar}
                  />
                  <label htmlFor="leftnavbar" className="input-label">
                    Left Navbar
                  </label>
                </div>
                <div className="cc-input-ele">
                  <input
                    type="checkbox"
                    id="rightnavbar"
                    className="input-ele"
                    onChange={onChangeNavbarRight}
                    checked={showRightNavbar}
                  />
                  <label htmlFor="rightnavbar" className="input-label">
                    Right Navbar
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }}
  </ConfigurationContext.Consumer>
)

export default ConfigurationController
