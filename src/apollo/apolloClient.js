import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'

import createApolloLink from './createApolloLink'

export default (uri, store) => {
  const cache = new InMemoryCache()
  const link = createApolloLink(uri, store)
  persistCache({
    cache,
    storage: window.localStorage
  })
  return new ApolloClient({
    link,
    cache,
    queryDeduplication: true,
    connectToDevTools: false,
    addTypename: true
  })
}
