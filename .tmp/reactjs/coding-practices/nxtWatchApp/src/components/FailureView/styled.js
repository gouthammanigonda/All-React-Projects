import styled from 'styled-components'

export const FailView = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`
export const Image = styled.img`
  width: 500px;
`
export const Heading = styled.h1`
  font-family: 'Roboto';
  font-size: 20px;
  margin-top: 0px;
  color: ${props => (props.isDarkTheme ? 'white' : 'null')};
  text-decoration: none;
`
export const Para = styled.p`
  font-family: 'Roboto';
  font-size: ${props => (props.fail ? '20px' : '13px')};
  color: ${props => (props.isDarkTheme ? '#616e7c' : '#7e858e')};
  margin-top: 0px;
`

export const Button = styled.button`
  background-color: transparent;
  border: ${props => (props.icon ? '0px' : '1px')} solid
    ${props => (props.isDarkTheme ? 'white' : 'black')};
  font-family: 'Roboto';
  font-size: 15px;
  font-weight: bold;
  color: ${props => (props.isDarkTheme ? 'white' : 'black')};
  cursor: pointer;
  outline: none;
  max-width: 150px;
  padding: 10px;
`
