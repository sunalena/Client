import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import gql from 'graphql-tag.macro'

import Loader from '../common/Loader'
import {
  Box,
  Card,
  BackgroundImage,
  Subhead,
  Small,
  Text,
  NavLink
} from 'rebass'

class LinkItem extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.nodeId !== nextProps.nodeId
  }

  render() {
    const {
      loading = false,
      userId,
      title,
      way,
      author = {},
      preview,
      imageUrl,
      id
    } = this.props
    if (loading) return <Loader />
    return (
      <Card my={2}>
        {imageUrl && <BackgroundImage is="img" src={imageUrl} alt="" />}
        <Box p={2}>
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
          <Small className="text-muted">
            Last updated 3 mins ago
            {userId === author.id && <Link to={`/links/${id}`}> Edit</Link>}
          </Small>
        </Box>
      </Card>
    )
  }
}

LinkItem.fragments = {
  link: gql`
    fragment Link on Link {
      id
      nodeId
      way
      title
      preview
      author: personByPersonId {
        id
        fullName
      }
      imageUrl
      createdAt
    }
  `
}

export default LinkItem
