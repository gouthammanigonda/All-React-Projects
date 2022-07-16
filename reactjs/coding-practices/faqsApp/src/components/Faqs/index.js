// Write your code here.
import {Component} from 'react'
import FaqItem from '../FaqItem'
import './index.css'

class Faqs extends Component {
  render() {
    const {faqsList} = this.props

    return (
      <div className="container1">
        <div className="container2">
          <h1 className="heading">FAQs</h1>
          <ul className="unorderedList">
            {faqsList.map(each => (
              <FaqItem faq={each} key={each.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Faqs
