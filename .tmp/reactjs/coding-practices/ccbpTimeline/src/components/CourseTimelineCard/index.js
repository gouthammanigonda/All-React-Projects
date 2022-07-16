// Write your code here
import {AiFillClockCircle} from 'react-icons/ai'
import './index.css'

const CourseTimelineCard = props => {
  const {course} = props
  const {courseTitle, description, duration, tagsList} = course
  return (
    <div className="course-container">
      <div className="header">
        <h1 className="heading">{courseTitle}</h1>
        <div className="flex-box">
          <AiFillClockCircle className="icon" />
          <p className="duration">{duration}</p>
        </div>
      </div>
      <p className="para">{description}</p>
      <ul className="unorderedList">
        {tagsList.map(each => (
          <p className="listitem" key={each.name}>
            {each.name}
          </p>
        ))}
      </ul>
    </div>
  )
}

export default CourseTimelineCard
