import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag.macro'

import { Loader, Subhead, Text, NavLink, BackgroundImage } from 'ui'

class LinkPage extends Component {
  render() {
    const {
      data: { loading, link = {} }
    } = this.props
    const { title, author = {}, preview, way, imageUrl } = link
    return loading ? (
      <Loader />
    ) : (
      <Fragment>
        {imageUrl && <BackgroundImage is="img" src={imageUrl} alt="" />}
        <Subhead>{title}</Subhead>
        {author.fullName && (
          <Text>
            The link was added by
            <Link to={`/persons/${author.id}`}>{` ${author.fullName}`}</Link>
          </Text>
        )}
        <Text>
          {preview}
          <NavLink href={way}> Read more</NavLink>
        </Text>
      </Fragment>
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
      imageUrl
      author: personByPersonId {
        id
        firstName
        lastName
        fullName
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
