import styled from 'styled-components'
import { space, fontSize, fontFamily, width } from 'styled-system'
import { selectColor } from 'styles/helpers'
const Input = styled.input`
  ${space}
  ${fontSize}
  ${fontFamily}
  ${width}
  display: flex;
  flex-grow: 2;
  border-radius: 4px;
  border: 1px solid ${selectColor('bg1')};
`

Input.defaultProps = {
  p: 2,
  my: 2,
  fontSize: 1,
  fontFamily: 'sans'
}

const TextArea = Input.withComponent('textarea')

export { Input, TextArea }
