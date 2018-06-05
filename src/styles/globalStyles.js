import { injectGlobal } from 'styled-components'

// injectGlobal`
//   @import url('https://fonts.googleapis.com/css?family=Karla:400,700|Lato:400,700');
//   *, *::after, *::before {
//     box-sizing: border-box;
//     -webkit-font-smoothing: antialiased;
//     -moz-osx-font-smoothing: grayscale;
//   }
//   html {
//     line-height: 1.444;
//     font-size: 14px;
//   }
//   body {
//     font-family: Karla, system-ui, sans-serif;
//   }
// `;

injectGlobal`
  * { box-sizing: border-box; }
  * font-family: sans-serif;
  body { padding-top: 3rem; }
  html {
    overflow-y: scroll;
  }
`
