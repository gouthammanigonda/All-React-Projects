import styled from 'styled-components'

export const Container = styled.div`
  padding-top: 10px;
  background-color: ${props => (props.isDarkTheme ? '#212121' : null)};
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Container2 = styled.div`
  box-shadow: 0px 4px 16px 0px
    ${props => (props.isDarkTheme ? ' #475569' : 'black')};
  background-color: ${props => (props.isDarkTheme ? 'black' : 'white')};
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  border-radius: 10px;
  width: 360px;
`

export const Image = styled.img`
  width: 150px;
`
export const Form = styled.form``

export const Div = styled.div`
  align-self: flex-start;
  margin-top: 20px;
  display: ${props => (props.checkbox ? 'flex' : null)};
  align-items: ${props => (props.checkbox ? 'center' : null)};
`

export const Input = styled.input`
  width: ${props => (props.checkbox ? null : '300px')};
  border: 1px solid #7e858e;
  padding: 10px;
  font-family: 'Roboto';
  font-size: 10px;
  color: #475569;
  background-color: transparent;
`

export const Label = styled.label`
  color: ${props => (!props.isDarkTheme ? 'white' : 'black')};
  font-family: 'Roboto';
  font-size: 10px;
  font-weight: ${props => (props.checkbox ? 300 : 600)};
`
export const Button = styled.button`
  background-color: #3b82f6;
  font-family: 'Roboto';
  font-size: 15px;
  color: '#ffffff';
  padding: 10px;
  cursor: pointer;
  outline: none;
  border: 0px;
  width: 100%;
  border-radius: 5px;
  margin-top: 20px;
`
export const ErrorMsg = styled.p`
  color: #ff0000;
  font-family: 'Roboto';
  font-size: 11px;
`
