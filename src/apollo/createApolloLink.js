import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'

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
    if (networkError) {
      if (networkError.response.status === 403) {
        store.dispatch(signoutSuccess())
        console.log('error', 403)
      } else if (networkError.response.status === 401) {
        store.dispatch(signoutSuccess())
        console.log('error', 401)
      }
    }
  })

  const httpLink = new HttpLink({ uri })

  return ApolloLink.from([authLink, errorLink, httpLink])
}
