const colors = {
  base: '#444',
  bg: 'white',
  primary: '#006699',
  secondary: 'grey',
  accent: 'red',
  darken1: 'rgba(0, 0, 0, 0.125)',
  darken2: 'rgba(0, 0, 0, 0.25)',
  darken3: 'rgba(0, 0, 0, 0.5)',
  darken4: 'rgba(0, 0, 0, 0.75)'
}

export const fonts = {
  0: 'system-ui, sans-serif',
  sans: 'Open Sans,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif',
  mono: '"SF Mono", "Roboto Mono", Menlo, monospace'
}

const fontSizes = [
  // '0.6rem',
  '0.7rem',
  '0.875rem',
  '1rem',
  '1.25rem',
  '1.5rem',
  '2rem'
]

export const theme = {
  // breakpoints: [0, 576, 768, 992, 1200],
  // space: [0, 4, 8, 16, 32, 64, 128],
  fonts,
  fontSizes,
  weights: {
    normal: 400,
    bold: 700
  },
  radii: [0, 2, 4],
  ts: {
    caps: {
      textTransform: 'uppercase',
      letterSpacing: '0.2em'
    },
    normal: {}
  },
  colors,
  buttonStyle: {
    primary: {
      color: 'white',
      backgroundColor: 'rgba(0, 0, 0, 0.125)',
      '&:hover': {
        backgroundColor: 'black'
      }
    }
  }
}

export default theme
