import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'

import createApolloLink from './createApolloLink'

export default (uri, store) => {
  return new ApolloClient({
    link: createApolloLink(uri, store),
    cache: new InMemoryCache(),
    queryDeduplication: true,
    connectToDevTools: false,
    addTypename: true
  })
}
