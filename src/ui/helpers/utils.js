import { css } from 'styled-components'

export const getCSSProperty = ({ prop, key, cssProperty }) => ({
  theme,
  ...props
}) => css`
  ${cssProperty}: ${theme[key][props[prop]]};
`
