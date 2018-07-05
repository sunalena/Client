import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import { Provider as RebassProvider } from 'rebass'

import createApolloClient from './apollo/apolloClient'
import configureStore from './redux/configureStore'

import registerServiceWorker from './registerServiceWorker'

import App from './App'
import { theme } from 'styles'

import 'styles/globalStyles'

const store = configureStore()
const client = createApolloClient('/graphql', store)

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <RebassProvider theme={theme}>
          <App />
        </RebassProvider>
      </BrowserRouter>
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
