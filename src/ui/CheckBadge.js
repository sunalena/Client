import sc from 'styled-components'
import { Badge } from 'rebass'

export const CheckBadge = sc(Badge)`
  background: ${({ checked, theme }) => !checked && theme.colors.dark};
`

export default CheckBadge
