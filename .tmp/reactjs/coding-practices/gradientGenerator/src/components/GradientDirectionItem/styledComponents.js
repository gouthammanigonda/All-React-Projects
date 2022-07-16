// Style your elements here
import styled from 'styled-components'

export const DirectionItemContainer = styled.div``

export const ListItem = styled.li`
  list-style-type: none;
`

export const CustomButton = styled.button`
  border: 1px solid white;
  padding: 10px;
  cursor: pointer;
  outline: none;
  width: 100px;
  color: black;
  font-family: 'Roboto';
  font-weight: bold;
  border-radius: 5px;
  opacity: ${props => (props.isActive ? 1 : 0.5)};
`
