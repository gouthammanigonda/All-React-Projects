import styled from 'styled-components'

export const MainContainer = styled.div`
  display: flex;
`

export const NotFoundDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${props => (props.isDarkTheme ? 'black' : 'white')};
`
export const Image = styled.img`
  width: 500px;
`
export const Heading = styled.h1`
  font-family: 'Roboto';
  font-size: 20px;
  color: ${props => (props.isDarkTheme ? 'white' : 'black')};
  font-weight: 500;
`
export const Para = styled.p`
  font-family: 'Roboto';
  font-size: 15px;
  color: ${props => (props.isDarkTheme ? 'white' : 'black')};
  margin-top: 0px;
`
