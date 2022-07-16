import styled from 'styled-components'

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => (props.isDarkTheme ? '#181818' : '#f9f9f9')};
`

export const Container = styled.div`
  display: flex;
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
export const Container3 = styled.div`
  width: 80%;
`
export const PopUpDiv = styled.div`
  width: 100%;
  height: 250px;
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png ');
  background-size: 1450px 250px;
  background-repeat: no-repeat;
  margin-top: 0px;
  display: flex;
  justify-content: space-between;
  padding: 20px 30px;
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
  margin-left: ${props => (props.search ? '8px' : '0px')};
`
export const Div2 = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
export const Container4 = styled.div`
  background-color: ${props => (props.isDarkTheme ? '#181818' : '#f9f9f9')};
  padding: 30px;
`
export const Div3 = styled.div`
  border: 1px solid #cccccc;
  width: 360px;
  display: flex;
  align-items: center;
  background-color: ${props => (props.isDarkTheme ? '#424242' : null)};
`

export const Input = styled.input`
  width: 300px;
  height: 45px;
  border: none;
  padding: 10px;
  font-family: 'Roboto';
  font-size: 15px;
  color: #475569;
  border-right: 1px solid #cccccc;
`
export const UnorderedList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin-left: 0px;
  padding-left: 0px;
`

export const ListItem = styled.li`
  list-style-type: none;
  width: 250px;
`

export const Div4 = styled.div`
  display: flex;
  align-items: ${props => (props.column ? 'center' : null)};
  gap: ${props => (props.column ? '4px' : '10px')};
  margin-top: ${props => (props.column ? null : '10px')};
`

export const Div5 = styled.div``

export const Heading2 = styled.h1`
  font-family: 'Roboto';
  font-size: ${props => (props.fail ? '25px' : '15px')};
  margin-top: 0px;
  color: ${props => (props.isDarkTheme ? 'white' : 'null')};
  text-decoration: none;
`
export const Para3 = styled.p`
  font-family: 'Roboto';
  font-size: ${props => (props.fail ? '20px' : '13px')};
  color: ${props => (props.isDarkTheme ? '#616e7c' : '#7e858e')};
  margin-top: 0px;
`

export const Image3 = styled.img`
  width: ${props => (props.logo ? '40px' : '250px')};
`
export const Li = styled.li`
  list-style: circle;
`
export const SearchFail = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`
export const Image4 = styled.img`
  width: 500px;
`
