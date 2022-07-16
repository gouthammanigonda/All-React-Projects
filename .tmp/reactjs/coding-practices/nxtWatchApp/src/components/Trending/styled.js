import styled from 'styled-components'

export const MainContainer = styled.div`
  display: flex;
`

export const TrendingContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: ${props => (props.isDarkTheme ? '#0f0f0f' : '#f9f9f9')};
  min-height: 100vh;
  flex-direction: column;
`

export const Container1 = styled.div`
  background-color: ${props => (props.isDarkTheme ? '#231f20' : ' #ebebeb')};
  display: flex;
  padding: 30px 50px;
  gap: 30px;
  width: 100%;
  height: 150px;
`
export const Icon = styled.div`
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.isDarkTheme ? 'black' : '#cbd5e1')};
  height: 80px;
  width: 80px;
`
export const Heading = styled.h1`
  color: ${props => (props.isDarkTheme ? 'white' : 'black')};
  font-family: 'Roboto';
  font-size: ${props => (props.small ? '20px' : '30px')};
`
export const Container2 = styled.ul`
  height: 100%;
  background-color: ${props => (props.isDarkTheme ? 'black' : '#f4f4f4')};
  margin-top: 0px;
  gap: 20px;
`

export const ListItem = styled.li`
  list-style-type: none;
  display: flex;
  width: 100%;
  align-items: center;
  margin-top: 10px;
  gap: 20px;
`

export const Image = styled.img`
  width: 300px;
`
export const Div2 = styled.div`
  display: ${props => (props.flex ? 'flex' : null)};
  align-items: ${props => (props.flex ? 'center' : null)};
  gap: ${props => (props.flex ? '5px' : null)};
  align-self: ${props => (props.flexstart ? 'flex-start' : null)};
`

export const Heading2 = styled.p`
  color: ${props => (props.isDarkTheme ? 'white' : 'black')};
  font-family: 'Roboto';
  font-size: ${props => (props.small ? '20px' : '20px')};
  font-weight: ${props => (props.small ? 500 : null)};
`

export const Para = styled.p`
  color: ${props => (props.isDarkTheme ? '#616e7c' : '#7e858e')};
  font-family: 'Roboto';
  font-size: ${props => (props.smaller ? '15px' : '30px')};
  margin-top: ${props => (props.margin ? '0px' : null)};
`
export const TestDiv = styled.div`
  background-color: ${props => (props.isDarkTheme ? '#0f0f0f' : '#f9f9f9')};
`
