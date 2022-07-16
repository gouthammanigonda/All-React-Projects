// Write your code here
import {
  DirectionItemContainer,
  CustomButton,
  ListItem,
} from './styledComponents'

const GradientDirectionItem = props => {
  const {each, onClickDirection, isActive} = props

  const onClickEachBTN = () => {
    onClickDirection(each.value)
  }

  return (
    <DirectionItemContainer>
      <ListItem key={each.directionId}>
        <CustomButton
          isActive={isActive}
          type="button"
          onClick={onClickEachBTN}
        >
          {each.displayText}
        </CustomButton>
      </ListItem>
    </DirectionItemContainer>
  )
}

export default GradientDirectionItem
