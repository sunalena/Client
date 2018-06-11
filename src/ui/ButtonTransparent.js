import styled from 'styled-components'
import { themeGet } from 'styled-system'
import { Button } from './Button'

export const ButtonTransparent = styled(Button)([], props => ({
  '&:hover': {
    backgroundColor: `${themeGet('colors.darken1')(props)}`
  },
  '&:active': {
    backgroundColor: `${themeGet('colors.darken2')(props)}`
  }
}))

ButtonTransparent.displayName = 'ButtonTransparent'

ButtonTransparent.defaultProps = {
  color: 'inherit',
  bg: 'transparent'
}

export default ButtonTransparent
