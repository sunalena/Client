import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag.macro'

import { Flex, RightLink } from 'ui'

const tagToList = ({ id, name }) => (
  <RightLink key={id} to={'/tags/' + id} name={name} />
)

const TagsList = ({ loading, error, fetchMore, allTags }) =>
  !loading &&
  !error && (
    <Flex flexDirection="column" alignItems="flex-start">
      {allTags.nodes.map(tagToList)}
    </Flex>
  )

const ALL_TAGS = gql`
  {
    allTags(orderBy: NAME_ASC) {
      nodes {
        nodeId
        id
        name
      }
    }
  }
`
const props = ({ data: { loading, error, allTags, fetchMore } }) => ({
  loading,
  error,
  fetchMore,
  allTags
})
export default graphql(ALL_TAGS, {
  props,
  options: { fetchPolicy: 'network-only' }
})(TagsList)
