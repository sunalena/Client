import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { RetryLink } from 'apollo-link-retry'

import { signoutSuccess } from 'redux/modules/auth'

export default (uri, store) => {
  const authLink = new ApolloLink((operation, forward) => {
    const { token } = store.getState().auth
    if (token) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`
        }
      })
    }
    return forward(operation)
  })

  const errorLink = onError(({ networkError, graphQLErrors }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path, ...rest }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      )
    if (networkError) {
      if (networkError) console.log(`[Network error]: ${networkError}`)
    }
  })

  const httpLink = new HttpLink({ uri })

  const retryLink = new RetryLink({
    delay: {
      initial: 500,
      max: Infinity,
      jitter: true
    },
    attempts: {
      max: 5,
      retryIf: (error, _operation) => {
        console.log('Retrying ...')
        return !!error
      }
    }
  })
  return ApolloLink.from([authLink, retryLink, errorLink, httpLink])
}
