// Write your code here
import {Component} from 'react'
import {Chrono} from 'react-chrono'
import ProjectTimelineCard from '../ProjectTimelineCard'
import CourseTimelineCard from '../CourseTimelineCard'
import './index.css'

class TimelineView extends Component {
  render() {
    const {timelineItemsList} = this.props
    const item = timelineItemsList.map(each => ({
      title: each.title,
    }))
    return (
      <div className="bg-container">
        <h1>MY JOURNEY OF CCBP 4.0</h1>
        <Chrono mode="VERTICAL_ALTERNATING" items={item}>
          {timelineItemsList.map(each => {
            if (each.categoryId === 'PROJECT') {
              return <ProjectTimelineCard key={each.id} project={each} />
            }
            return <CourseTimelineCard key={each.id} course={each} />
          })}
        </Chrono>
      </div>
    )
  }
}

export default TimelineView
