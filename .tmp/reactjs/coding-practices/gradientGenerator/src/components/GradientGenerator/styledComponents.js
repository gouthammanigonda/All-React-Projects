// Style your elements here
import styled from 'styled-components'

export const MainContainer = styled.div`
  height: 100vh;
  padding: 10px;
  background-image: linear-gradient(${props => props.gradient});
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 20px;
`
export const Heading = styled.h1`
  font-family: 'Roboto';
  font-size: 30px;
  color: black;
  color: white;
`
export const Div = styled.div``

export const Para = styled.p`
  font-family: 'Roboto';
  color: #ededed;
`
export const UnorderedList = styled.ul`
  display: flex;
  gap: 20px;
`
export const Input = styled.input`
  background-color: ${props => props.color};
  border: 0px;
  width: 100px;
  height: 50px;
  cursor: pointer;
  outline: none;
  padding: 20px;
  border-radius: 10px;
`
export const ParaInput = styled.p`
  font-family: 'Roboto';
  font-size: 20px;
  color: white;
`

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
`
export const CustomButton = styled.button`
  background-color: #00c9b7;
  padding: 10px;
  outline: none;
  cursor: pointer;
  font-family: 'Roboto';
  font-weight: bold;
  color: #1e293b;
  width: 100px;
  border-radius: 10px;
  border: 0px;
`
