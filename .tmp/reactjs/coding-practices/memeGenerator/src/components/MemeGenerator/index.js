import {Component} from 'react'
import {
  Container,
  SubContainer,
  Heading,
  Container2,
  Form,
  FlexContainer,
  InputEle,
  LabelEle,
  Select,
  Option,
  Button,
  ResultContainer,
  ResultImageContainer,
  ResultsHeading,
} from './styledComponents'

const fontSizesOptionsList = [
  {
    optionId: '8',
    displayText: '8',
  },
  {
    optionId: '12',
    displayText: '12',
  },
  {
    optionId: '16',
    displayText: '16',
  },
  {
    optionId: '20',
    displayText: '20',
  },
  {
    optionId: '24',
    displayText: '24',
  },
  {
    optionId: '28',
    displayText: '28',
  },
  {
    optionId: '32',
    displayText: '32',
  },
]
// Write your code here

class MemeGenerator extends Component {
  state = {
    imageUrlIp: '',
    topTextIp: '',
    bottomTextIp: '',
    fontSizeIp: fontSizesOptionsList[0].displayText,
    imageUrl: '',
    topText: '',
    bottomText: '',
    fontSize: '',
  }

  onClickGenerate = event => {
    event.preventDefault()
    const {imageUrlIp, topTextIp, bottomTextIp, fontSizeIp} = this.state
    this.setState({
      imageUrl: imageUrlIp,
      topText: topTextIp,
      bottomText: bottomTextIp,
      fontSize: fontSizeIp,
    })
  }

  onChangeImage = event => {
    this.setState({
      imageUrlIp: event.target.value,
    })
  }

  onChangeTopText = event => {
    this.setState({
      topTextIp: event.target.value,
    })
  }

  onChangeBottomText = event => {
    this.setState({
      bottomTextIp: event.target.value,
    })
  }

  onChangeFontSize = event => {
    this.setState({
      fontSizeIp: event.target.value,
    })
  }

  render() {
    const {imageUrl, topText, bottomText, fontSize} = this.state
    console.log(imageUrl, topText, bottomText, fontSize)
    return (
      <Container>
        <SubContainer>
          <Heading isHeading>Meme Generator</Heading>
          <Container2>
            <Form onSubmit={this.onClickGenerate}>
              <FlexContainer>
                <LabelEle htmlFor="imageUrl">Image URL</LabelEle>
                <InputEle
                  type="text"
                  id="imageUrl"
                  placeholder="Enter image Url"
                  onChange={this.onChangeImage}
                />
              </FlexContainer>
              <FlexContainer>
                <LabelEle htmlFor="toptext">Top Text</LabelEle>
                <InputEle
                  type="text"
                  id="toptext"
                  placeholder="Enter top text"
                  onChange={this.onChangeTopText}
                />
              </FlexContainer>
              <FlexContainer>
                <LabelEle htmlFor="bottomText">Bottom Text</LabelEle>
                <InputEle
                  type="text"
                  id="bottomText"
                  placeholder="Enter bottom text"
                  onChange={this.onChangeBottomText}
                />
              </FlexContainer>
              <FlexContainer>
                <LabelEle htmlFor="select">Font Size</LabelEle>
                <Select id="select" onChange={this.onChangeFontSize}>
                  {fontSizesOptionsList.map(each => (
                    <Option key={each.optionId} value={each.optionId}>
                      {each.displayText}
                    </Option>
                  ))}
                </Select>
              </FlexContainer>
              <Button type="submit">Generate</Button>
            </Form>

            <ResultContainer data-testid="meme">
              <ResultImageContainer url={imageUrl}>
                <ResultsHeading fontSize={fontSize}>{topText}</ResultsHeading>
                <ResultsHeading fontSize={fontSize}>
                  {bottomText}
                </ResultsHeading>
              </ResultImageContainer>
            </ResultContainer>
          </Container2>
        </SubContainer>
      </Container>
    )
  }
}

export default MemeGenerator
