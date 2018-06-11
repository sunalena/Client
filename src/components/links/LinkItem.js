import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import gql from 'graphql-tag.macro'

import {
  Loader,
  Flex,
  Box,
  Card,
  Image,
  Subhead,
  Text,
  NavLink,
  ButtonTransparent
} from 'ui'

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
      id,
      createdAt
    } = this.props
    if (loading) return <Loader />
    const postDate = new Date(createdAt)
    return (
      <Card
        is={Flex}
        my={3}
        p={0}
        flexDirection={['column-reverse', null, 'row']}
      >
        <Box w={imageUrl ? [1, null, 1 / 2] : 1} py={[2, 3]} px={[3, 4]}>
          <Subhead py={3}>{title}</Subhead>
          {author.fullName && (
            <Text fontSize={1}>
              The link was added by
              <Link to={`/persons/${author.id}`}>{` ${author.fullName}`}</Link>
            </Text>
          )}
          <Text fontSize={1}>{preview}</Text>
          <Flex flexDirection="row" alignItems="center" mt={4}>
            <ButtonTransparent is={NavLink} href={way}>
              {!!createdAt && postDate.toLocaleString()}
            </ButtonTransparent>
            <Box m="auto" />
            <ButtonTransparent
              is={Link}
              to={userId === author.id ? `/links/${id}` : `/links/${id}`}
            >
              {userId === author.id ? 'EDIT' : 'VIEW'}
            </ButtonTransparent>
          </Flex>
        </Box>
        {imageUrl && (
          <Box w={[1, null, 1 / 2]} p={0}>
            <Image w={1} is="img" src={imageUrl} alt="" />
          </Box>
        )}
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
