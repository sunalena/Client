import sc from 'styled-components'
import { Badge } from 'rebass'
import { themeGet } from 'styled-system'

export const CheckBadge = sc(Badge)`
  text-decoration: none;
  background: ${({ checked, ...props }) =>
    checked
      ? themeGet('colors.darken4')(props)
      : themeGet('colors.darken2')(props)};
`

export default CheckBadge
