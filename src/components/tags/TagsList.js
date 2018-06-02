import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag.macro'
import { Link } from 'react-router-dom'

import { ListGroup } from 'reactstrap'

const tagToList = ({ id, name }) => (
  <Link key={id} to={'/tags/' + id}>
    {name}
  </Link>
)

const TagsList = ({ loading, error, fetchMore, allTags }) =>
  !loading && <ListGroup>{allTags.nodes.map(tagToList)}</ListGroup>

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
export default graphql(ALL_TAGS, { props })(TagsList)
