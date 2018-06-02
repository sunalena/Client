import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag.macro'

import Loader from '../common/Loader'

class LinkPage extends Component {
  shouldComponentUpdate(nextProps, nextStae) {
    return false
  }

  render() {
    const {
      data: { loading, link }
    } = this.props
    return loading ? (
      <Loader />
    ) : (
      <div>
        <h2>
          {link.title} by{' '}
          <Link to={`/people/${link.author.id}`}>
            {link.author.firstName} {link.author.lastName}
          </Link>
        </h2>
        {link.preview}
      </div>
    )
  }
}

const LINK_BY_ID_QUERY = gql`
  query LinkByIdQuery($id: Int!) {
    link: linkById(id: $id) {
      id
      nodeId
      title
      way
      preview
      createdAt
      author: personByPersonId {
        id
        firstName
        lastName
      }
    }
  }
`

const config = {
  options: ({
    match: {
      params: { linkId: id }
    }
  }) => ({
    variables: { id }
  })
}

export default graphql(LINK_BY_ID_QUERY, config)(LinkPage)
