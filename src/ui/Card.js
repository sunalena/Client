import styled from 'styled-components'
import { space, color, boxShadow, borderRadius } from 'styled-system'
import { Flex } from './Flex'

const Card = styled(Flex)`
  ${color}
  ${space}
  ${borderRadius}
  ${boxShadow}
  box-shadow: 0 0 4px rgba(0,0,0,0.5);
`

Card.displayName = 'Card'

Card.defaultProps = {
  color: 'base',
  p: 2,
  bg: 'white'
  // borderRadius: 2
  // boxShadow: 2
}

export { Card }
