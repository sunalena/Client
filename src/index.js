import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import { Provider as RebassProvider } from 'rebass'
import { injectGlobal } from 'styled-components'

import createApolloClient from './apollo/apolloClient'
import configureStore from './redux/configureStore'

import registerServiceWorker from './registerServiceWorker'
import 'bootstrap/dist/css/bootstrap.css'

import App from './App'

const store = configureStore()
const client = createApolloClient('/graphql', store)

injectGlobal`
  * { box-sizing: border-box; }
  * font-family: sans-serif;
  body { padding-top: 3rem; }
  html {
    overflow-y: scroll;
  }
`
ReactDOM.render(
  <RebassProvider>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  </RebassProvider>,
  document.getElementById('root')
)

registerServiceWorker()
