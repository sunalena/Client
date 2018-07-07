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
  Button,
  CheckBadge
} from 'ui'

class LinkItem extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.nodeId !== nextProps.nodeId
  }

  render() {
    const {
      loading = false,
      title,
      way,
      person = {},
      preview,
      imageUrl,
      id,
      createdAt,
      linkTagsByLinkId = {}
    } = this.props
    if (loading) return <Loader />
    const postDate = new Date(createdAt)
    postDate.setMinutes(postDate.getMinutes() - postDate.getTimezoneOffset())
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
          {person.label && (
            <Flex
              mb={3}
              flexDirection="row"
              alignItems="center"
              color="primary"
            >
              <Text fontSize={1} py={2}>
                The link was added by{' '}
              </Text>
              <Button is={Link} to={`/person/${person.value}/links`} px={1}>
                {person.label}
              </Button>
            </Flex>
          )}
          <Text fontSize={1}>{preview}</Text>
          <Box mt={3} mx={-1}>
            {tags.map(({ id, name }) => (
              <CheckBadge
                is={Link}
                to={`/tag/${id}/links`}
                key={id}
                my={1}
                checked={true}
              >
                {name}
              </CheckBadge>
            ))}
          </Box>
          <Flex flexDirection="row" alignItems="center" mx={-3} mt={3}>
            <Button is={NavLink} href={way}>
              {!!createdAt && postDate.toLocaleString()}
            </Button>
            <Box m="auto" />
            <Button is={Link} to={`/links/${id}`}>
              EDIT
            </Button>
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

const tagFragment = gql`
  fragment Tag on Tag {
    nodeId
    id
    name
  }
`

const linkTagFragment = gql`
  fragment LinkTag on LinkTag {
    nodeId
    linkId
    tagId
    tagByTagId {
      ...Tag
    }
  }
  ${tagFragment}
`

const linkFragment = gql`
  fragment Link on Link {
    id
    nodeId
    way
    title
    preview
    person: personByPersonId {
      value: id
      label: fullName
    }
    linkTagsByLinkId {
      nodes {
        ...LinkTag
      }
    }
    imageUrl
    createdAt
  }
  ${linkTagFragment}
`

LinkItem.fragments = {
  link: linkFragment,
  linkTag: linkTagFragment,
  tag: tagFragment
}

export default LinkItem
