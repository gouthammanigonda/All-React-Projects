// Write your code here
import './index.css'

const PlanetItem = props => {
  const {planet} = props
  const {name, imageUrl, description} = planet
  return (
    <div className="planet">
      <div>
        <img src={imageUrl} alt={`planet ${name}`} className="planet-img" />
      </div>
      <h1 className="heading2">{name}</h1>
      <p className="para">{description}</p>
    </div>
  )
}

export default PlanetItem
