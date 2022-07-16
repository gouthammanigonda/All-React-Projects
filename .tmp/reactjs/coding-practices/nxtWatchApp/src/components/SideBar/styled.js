import styled from 'styled-components'

export const Container2 = styled.nav`
  background-color: ${props => (props.isDarkTheme ? '#212121' : null)};
  width: 20%;
  margin-left: 0px;
  padding: 0px 20px;
`
export const Container3 = styled.div`
  height: 91vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const SubContainer = styled.ul`
  margin-left: 0px;
  padding-left: 0px;
`

export const Div = styled.li`
  display: flex;
  align-items: center;
  gap: 15px;
  list-style-type: none;
`

export const Para = styled.p`
  font-family: 'Roboto';
  font-size: 15px;
  color: ${props => (props.isDarkTheme ? 'white' : 'black')};
  font-weight: 400;
  margin-left: 5px;
`
export const Heading = styled.p`
  font-family: 'Roboto';
  font-size: 20px;
  color: ${props => (props.isDarkTheme ? 'white' : 'black')};
`
export const Image = styled.img`
  width: ${props => (props.ad ? '200px' : '30px')};
`
export const Para2 = styled.p`
  font-family: 'Roboto';
  font-size: ${props => (props.ad ? '20px' : '15px')};
  color: ${props => (props.isDarkTheme ? 'white' : 'black')};
  font-weight: ${props => (props.ad ? '400' : '600')};
  width: 70%;
`
