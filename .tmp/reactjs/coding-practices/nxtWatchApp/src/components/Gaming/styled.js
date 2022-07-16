import styled from 'styled-components'

export const MainContainer = styled.div`
  display: flex;
`

export const GamingContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: ${props => (props.isDarkTheme ? '#0f0f0f ' : '#f9f9f9')};
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
  padding: 30px 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
`
export const ListItem = styled.li`
  list-style-type: none;
  align-self: flex-start;
`

export const Image = styled.img`
  width: 230px;
  height: 350px;
`

export const Heading2 = styled.p`
  font-family: 'Roboto';
  font-size: 15px;
  font-weight: bold;
  color: ${props => (props.isDarkTheme ? 'black' : '#f4f4f4')};
`

export const Para = styled.p`
  font-family: 'Roboto';
  font-size: 15px;

  color: ${props => (props.isDarkTheme ? '#616e7c' : '#7e858e')};
`

export const Div = styled.div``

export const TestDiv = styled.div`
  background-color: ${props => (props.isDarkTheme ? '#0f0f0f' : '#f9f9f9')};
`
