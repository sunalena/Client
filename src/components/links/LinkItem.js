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
  ButtonTransparent,
  CheckBadge
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
      createdAt,
      linkTagsByLinkId = {}
    } = this.props
    if (loading) return <Loader />
    const postDate = new Date(createdAt)
    const tagNodes = linkTagsByLinkId.nodes || []
    const tags =
      tagNodes.length > 0
        ? tagNodes.map(({ tagByTagId = {} }) => ({ ...tagByTagId }))
        : []
    return (
      <Card
        is={Flex}
        my={3}
        p={0}
        flexDirection={['column-reverse', null, 'row']}
      >
        <Box w={imageUrl ? [1, null, 1 / 2] : 1} py={[2, 3]} px={[3, 4]}>
          <Subhead py={2}>{title}</Subhead>
          {author.fullName && (
            <Flex
              mb={3}
              flexDirection="row"
              alignItems="center"
              color="primary"
            >
              <Text fontSize={1}>The link was added by </Text>
              <ButtonTransparent to={`/persons/${author.id}`} px={1}>
                {author.fullName}
              </ButtonTransparent>
            </Flex>
          )}
          <Text fontSize={1}>{preview}</Text>
          <Box mt={2}>
            {tags.map(({ id, name }) => (
              <CheckBadge key={id} my={1} checked={true}>
                {name}
              </CheckBadge>
            ))}
          </Box>
          <Flex flexDirection="row" alignItems="center">
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
          <Flex w={[1, null, 1 / 2]} p={0} alignItems="center">
            <Image w={1} is="img" src={imageUrl} alt="" />
          </Flex>
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
      linkTagsByLinkId {
        nodes {
          tagByTagId {
            name
            id
          }
        }
      }
      imageUrl
      createdAt
    }
  `
}

export default LinkItem
