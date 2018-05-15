import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'

import createApolloClient from './apollo/apolloClient'
import configureStore from './redux/configureStore'

import registerServiceWorker from './registerServiceWorker'

import App from './App'

import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
// import './index_theme.css'

const store = configureStore()
const client = createApolloClient('/graphql', store)

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
