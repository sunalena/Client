// import { Input } from 'rebass'
// export { Input }
import styled from 'styled-components'
import { space, fontSize, fontFamily } from 'styled-system'

const Input = styled.input`
  ${space}
  ${fontSize}
  ${fontFamily}
`

Input.defaultProps = {
  p: 2,
  m: 2,
  fontSize: 1,
  fontFamily: 'sans'
}

export { Input }
