import { generateColors } from 'styles/helpers'
import { buttonStyle } from './buttonStyle'

const baseColors = {
  base: { r: 68, g: 68, b: 68 },
  bg: { r: 255, g: 255, b: 255 },
  primary: { r: 75, g: 123, b: 216 },
  secondary: { r: 128, g: 118, b: 128 },
  accent: { r: 255, g: 99, b: 71 }
}
const colors = generateColors(baseColors)

const breakpoints = ['32em', '48em', '64em', '80em']
const space = [0, 4, 8, 16, 32, 64, 128]
const fonts = {
  0: 'system-ui, sans-serif',
  sans: 'Open Sans,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif',
  mono: '"SF Mono", "Roboto Mono", Menlo, monospace'
}
const fontSizes = ['0.7rem', '0.875rem', '1rem', '1.25rem', '1.5rem', '2rem']
const weights = {
  normal: 400,
  bold: 700
}
const radii = [0, 2, 4]

export const theme = {
  breakpoints,
  space,
  fonts,
  fontSizes,
  weights,
  radii,
  colors,
  buttonStyle: buttonStyle(colors)
}
