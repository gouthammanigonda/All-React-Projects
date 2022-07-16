import styled from 'styled-components'

export const Container = styled.nav`
  background-color: ${props => (props.isDarkTheme ? '#212121' : null)};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
`
export const Container2 = styled.ul`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 0px;
`
export const Image = styled.img`
  max-width: ${props => (props.profile ? '40px' : '150px')};
`
export const Div = styled.li`
  list-style-type: none;
`

export const Div2 = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  list-style-type: none;
`

export const Button = styled.button`
  cursor: pointer;
  outline: none;
  background-color: transparent;
  border: 0px;
`

export const Button2 = styled.button`
  background-color: transparent;
  border: 1px solid ${props => (props.isDarkTheme ? 'white' : '#4f46e5')};
  font-family: 'Roboto';
  font-size: 15px;
  font-weight: bold;
  color: ${props => (props.isDarkTheme ? 'white' : '#4f46e5')};
  cursor: pointer;
  outline: none;
  border-radius: 5px;
  padding: 10px;
  width: 80px;
`
export const PopupContainer = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 50vw;
  background-color: #424242;
`
export const PopDiv = styled.li`
  background-color: ${props => (props.isDarkTheme ? 'white' : ' #231f20')};
  border-radius: 10px;

  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  list-style-type: none;
`
export const PopupHeading = styled.p`
  font-family: 'Roboto';
  font-size: 20px;
  color: ${props => (props.isDarkTheme ? 'white' : 'black')};
  font-weight: 500;
`
export const Div3 = styled.div`
  gap: 20px;
`

export const PopButton = styled.button`
  background-color: ${props => (props.logout ? '#3b82f6' : 'transparent')};
  border: ${props => (props.logout ? '0px' : '1px solid #cbd5e1')};
  font-family: 'Roboto';
  font-size: 15px;
  font-weight: bold;
  color: ${props => (props.logout ? 'white' : '#cbd5e1')};
  cursor: pointer;
  outline: none;
  border-radius: 5px;
  padding: 10px;
  width: 80px;
  margin-right: 20px;
`
