import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import { Provider as RebassProvider } from 'rebass'

import createApolloClient from './apollo/apolloClient'
import configureStore from './redux/configureStore'

import registerServiceWorker from './registerServiceWorker'
import 'bootstrap/dist/css/bootstrap.css'

import App from './App'
import { theme } from 'styles'

import 'styles/globalStyles'

const store = configureStore()
const client = createApolloClient('http://localhost:4000/graphql', store)

ReactDOM.render(
  <RebassProvider theme={theme}>
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
