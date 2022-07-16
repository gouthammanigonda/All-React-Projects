import './index.css'

const DestinationItem = props => {
  const {eachDestination} = props
  const {id, name, imageUrl} = eachDestination

  return (
    <li key={id}>
      <img src={imageUrl} alt={name} />
      <p>{name}</p>
    </li>
  )
}

export default DestinationItem
