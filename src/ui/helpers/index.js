import { css } from 'styled-components'
import { complexStyle, responsiveStyle } from 'styled-system'
import { getCSSProperty } from './utils'
// export const colorSelector = (property, path) => css`
//   background: ${({ theme }) => theme.colors[path]};
// `

// export const textColor = complexStyle({
//   prop: 'color',
//   key: 'colors'
// })

// export const bgColor = complexStyle({
//   prop: 'bg',
//   cssProperty: 'backgroundColor',
//   key: 'colors'
// })

// export const color = props => ({
//   ...textColor(props),
//   ...bgColor(props)
// })
// color.propTypes = {
//   ...textColor.propTypes,
//   ...bgColor.propTypes
// }

// export const color = ({ theme: { colors = {} }, color }) => css`
//   color: ${colors[color]};
// `

// export const bgColor = ({ theme: { colors = {} }, bg }) => css`
//   background-color: ${colors[bg]};
// `

export const bgColor = getCSSProperty({
  prop: 'bg',
  key: 'colors',
  cssProperty: 'background-color'
})

export const textColor = getCSSProperty({
  prop: 'color',
  key: 'colors',
  cssProperty: 'color'
})

export const color = { textColor, bgColor }

export const hidden = responsiveStyle({
  prop: 'hidden',
  cssProperty: 'display',
  getter: hidden => (hidden ? 'none' : 'flex')
})

// export const hidden = ({ hidden }) =>
//   hidden &&
//   css`
//     display: none;
//   `

export const buttonStyle = complexStyle({
  prop: 'buttonStyle',
  key: 'buttonStyle'
})
