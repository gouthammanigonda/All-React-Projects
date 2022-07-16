// Write your code here
import Slider from 'react-slick'
import PlanetItem from '../PlanetItem'

import './index.css'

const PlanetsSlider = props => {
  const {planetsList} = props
  return (
    <div testid="planets" className="bg-container">
      <div className="slider-container">
        <h1 className="heading">PLANETS</h1>
        <Slider
          className="slider"
          setting={{dots: true, slidesToShoe: 1, slidesToScroll: 1}}
        >
          {planetsList.map(each => (
            <PlanetItem key={each.id} planet={each} />
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default PlanetsSlider
