import styled from 'styled-components'
import {
  space,
  fontSize,
  fontWeight,
  textAlign,
  lineHeight,
  color
} from 'styled-system'

// import { color, bgColor } from 'ui/helpers'

export const Text = styled.div`
  ${color}
  ${space}
  ${fontSize}
  ${fontWeight}
  ${textAlign}
  ${lineHeight}
`

Text.displayName = 'Text'

Text.defaultProps = {
  //   mx: [0, 1, 2, 3]
  // color: '#FFF'
  //   bg: 'test'
  // lineHeight: '1'
}
