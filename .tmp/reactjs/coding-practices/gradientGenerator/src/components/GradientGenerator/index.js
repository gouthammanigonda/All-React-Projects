import {Component} from 'react'

import GradientDirectionItem from '../GradientDirectionItem'
import {
  MainContainer,
  Div,
  Heading,
  Para,
  UnorderedList,
  Input,
  ParaInput,
  InputContainer,
  CustomButton,
} from './styledComponents'

const gradientDirectionsList = [
  {directionId: 'TOP', value: 'top', displayText: 'Top'},
  {directionId: 'BOTTOM', value: 'bottom', displayText: 'Bottom'},
  {directionId: 'RIGHT', value: 'right', displayText: 'Right'},
  {directionId: 'LEFT', value: 'left', displayText: 'Left'},
]
// Write your code here
class GradientGenerator extends Component {
  state = {
    inputOne: '#8ae323',
    inputTwo: '#014f7b ',
    direction: gradientDirectionsList[0].value,
    gradient: `to ${gradientDirectionsList[0].value} ,#8ae323,#014f7b `,
  }

  onChangeInputOne = event => {
    this.setState({
      inputOne: event.target.value,
    })
  }

  onChangeInputTwo = event => {
    this.setState({inputTwo: event.target.value})
  }

  onClickDirection = direction => {
    this.setState({direction})
  }

  onClickGenerate = () => {
    const {inputOne, inputTwo, direction} = this.state
    this.setState({
      gradient: `to ${direction} ,${inputOne},${inputTwo} `,
    })
  }

  render() {
    const {inputOne, inputTwo, direction, gradient} = this.state
    console.log(direction)
    return (
      <MainContainer data-testid="gradientGenerator" gradient={gradient}>
        <Heading>Generate a CSS color Gradient</Heading>
        <Div>
          <Para>Choose Direction</Para>
          <UnorderedList>
            {gradientDirectionsList.map(each => (
              <GradientDirectionItem
                key={each.directionId}
                each={each}
                onClickDirection={this.onClickDirection}
                isActive={each.value === direction}
              />
            ))}
          </UnorderedList>
        </Div>
        <Div>
          <Para>Pick the Colors</Para>
          <InputContainer>
            <Div>
              <ParaInput>{inputOne}</ParaInput>
              <Input
                color={inputOne}
                type="color"
                value={inputOne}
                onChange={this.onChangeInputOne}
              />
            </Div>
            <Div>
              <ParaInput>{inputTwo}</ParaInput>
              <Input
                color={inputTwo}
                type="color"
                value={inputTwo}
                onChange={this.onChangeInputTwo}
              />
            </Div>
          </InputContainer>
        </Div>
        <CustomButton onClick={this.onClickGenerate}>Generate</CustomButton>
      </MainContainer>
    )
  }
}

export default GradientGenerator
