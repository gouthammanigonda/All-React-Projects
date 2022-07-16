// Write your code here
import {AiFillCalendar} from 'react-icons/ai'
import './index.css'

const ProjectTimelineCard = props => {
  const {project} = props
  const {projectTitle, description, imageUrl, duration, projectUrl} = project
  console.log(projectTitle)
  return (
    <div className="projects-container">
      <img src={imageUrl} alt="project" className="project-img" />
      <div className="header">
        <h1 className="heading">{projectTitle}</h1>
        <div className="flex-box">
          <AiFillCalendar className="icon" />
          <p className="duration">{duration}</p>
        </div>
      </div>

      <p className="para">{description}</p>
      <a className="anchor-ele" href={`${projectUrl}`}>
        Visit
      </a>
    </div>
  )
}

export default ProjectTimelineCard
