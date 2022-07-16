// Style your components here
import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const SubContainer = styled.div`
  width: 90%;
`

export const Heading = styled.h1`
  font-family: 'Roboto';
  color: ${props => (props.isHeading ? '#35469c' : ' #7e858e')};
  font-size: ${props => (props.isHeading ? '' : '20px')};
`
export const Form = styled.form`
  width: 50%;
`

export const InputEle = styled.input`
  border: 1px solid #d7dfe9;
  padding: 10px;
`

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`

export const LabelEle = styled.label`
  font-family: 'Roboto';
  color: #7e858e;
`
export const Select = styled.select`
  padding: 10px;
`

export const Option = styled.option`
  padding: 10px;
`

export const Button = styled.button`
  background-color: #0b69ff;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 10px;
  font-family: 'Roboto';
  color: white;
  border-radius: 5px;
  width: 100px;
`

export const Container2 = styled.div`
  display: flex;
`

export const ResultContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
`

export const ResultImageContainer = styled.div`
  background-image: url(${props => props.url});
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  background-size: cover;
  height: 400px;
  width: 90%;
`

export const ResultsHeading = styled.p`
  font-family: 'Roboto';
  color: white;
  font-size: ${props => props.fontSize}px;
`
