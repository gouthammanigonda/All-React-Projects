import styled from 'styled-components'

export const MainContainer = styled.div`
  display: flex;
`
export const ItemContainer = styled.div`
  background-color: ${props => (props.isDarkTheme ? '#0f0f0f' : '#f9f9f9')};
  padding: 30px;
  width: 80%;
`
export const Container = styled.div``

export const Image = styled.img`
  width: 50px;
`

export const Heading = styled.p`
  font-family: 'Roboto';
  font-size: ${props => (props.h2 ? '17px' : '20px')};
  font-weight: ${props => (props.h2 ? 400 : 500)};
  color: ${props => (props.isDarkTheme ? '#f1f1f1' : null)};
`

export const Para = styled.p`
  font-family: 'Roboto';
  font-size: 13px;
  color: ${props => (props.isDarkTheme ? '#616e7c' : '#7e858e')};

  margin-top: 0px;
`
export const Div = styled.div`
  display: flex;
  gap: 5px;
  justify-content: ${props => (props.main ? 'space-between' : null)};
`
export const Hrline = styled.hr`
  border-color: ${props => (props.isDarkTheme ? '#00306e' : '#616e7c')};
`
export const Button = styled.button`
  border: none;
  cursor: pointer;
  outline: none;
  display: flex;
  gap: 5px;
  background-color: transparent;
`
export const Para2 = styled.p`
  font-family: 'Roboto';
  font-size: 13px;
  color: ${props => (!props.isDarkTheme ? '#64748b' : '#2563eb')};

  margin-top: 0px;
`
export const Div2 = styled.div``

export const Div3 = styled.div``

export const VideoContainer = styled.div`
  height: 500px;
  width: 100%;
`
export const TestDiv = styled.div`
  background-color: ${props => (props.isDarkTheme ? '#0f0f0f' : '#f9f9f9')};
`
