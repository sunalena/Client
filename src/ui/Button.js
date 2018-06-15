import sys from 'system-components'
import { buttonStyle } from 'styles/helpers'

const Button = sys(
  {
    is: 'button',
    fontSize: 1,
    fontWeight: 'bold',
    bg: 'transparent',
    color: 'inherit',
    // lineHeight: 1,
    m: 0,
    px: 3,
    py: 2,
    borderRadius: 2,
    border: 0,
    buttonStyle: 'default'
  },
  props => ({
    fontFamily: 'inherit',
    WebkitFontSmoothing: 'antialiased',
    display: 'inline-block',
    verticalAlign: 'middle',
    textAlign: 'center',
    textDecoration: 'none',
    appearance: 'none',

    '&:focus': {
      outline: 0
    },
    '&:disabled': {
      opacity: 1 / 4
    },
    ...buttonStyle(props)
  }),
  'buttonStyle'
)

Button.displayName = 'Button'

export { Button }

// import styled from 'styled-components'

// import {
//   space,
//   color,
//   boxShadow,
//   borderRadius,
//   borderWidth
// } from 'styled-system'

// import { buttonStyle } from 'ui/helpers/index'

// const Button = styled.button`
//     ${color}
//     ${space}
//     ${borderRadius}
//     ${borderWidth}
//     ${buttonStyle}
//     ${boxShadow}
//     ${buttonStyle}
//     display: inline-block;
//     font-family: inherit;
//     -webkit-font-smoothing: antialiased;
//     vertical-align: middle;
//     text-align: center;
//     text-decoration: none;
//     appearance: none;
//     &:focus: {
//       outline: 0
//     };
//     &:disabled: {
//       opacity: 1 / 4
//     }
//   }`

// Button.defaultProps = {
//   fontSize: 1,
//   fontWeight: 'bold',
//   lineHeight: 1,
//   m: 0,
//   px: 3,
//   py: 2,
//   borderRadius: 2,
//   border: 0,
//   buttonStyle: 'default'
// }
// Button.displayName = 'Button'

// export { Button }
