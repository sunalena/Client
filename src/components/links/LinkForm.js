import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag.macro'

import { Box, Card, Button, Input, CheckBadge, Text, Loader } from 'ui'
import { mutateProp } from 'utils'

class LinkForm extends Component {
  state = {
    cSelected: []
  }

  values = {
    title: '',
    way: '',
    preview: '',
    imageUrl: '',
    personId: ''
  }

  handleChange = e => {
    const { id, value } = e.target
    this.values[id] = value
  }

  handleChangeLink = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  onCheckboxBtnClick = event => {
    const selected = Number(event.target.id)
    const index = this.state.cSelected.indexOf(selected)
    if (index < 0) {
      this.state.cSelected.push(selected)
    } else {
      this.state.cSelected.splice(index, 1)
    }
    this.setState({ cSelected: [...this.state.cSelected] })
  }

  handleSubmit = async event => {
    event.preventDefault()
    const { cSelected = [] } = this.state
    const { createLink, createLinkTag, currentPerson } = this.props
    const personId = currentPerson.id
    try {
      const { data } = await createLink({
        ...this.values,
        personId
      })
      console.log('createLink', data)
      const { linkId } = data.createLink.link
      cSelected.forEach(tagId => {
        createLinkTag({ linkId, tagId })
      })
    } catch (error) {
      console.log('there was an error sending the query', error)
    }
  }

  tagToButton = tag => (
    <CheckBadge
      key={tag.id}
      my={1}
      id={tag.id}
      onClick={this.onCheckboxBtnClick}
      checked={this.state.cSelected.includes(tag.id)}
    >
      {tag.name}
    </CheckBadge>
  )

  renderInput = (name, label, placeholder) => (
    <Input
      id={name}
      type="text"
      name={name}
      label={label}
      placeholder={placeholder}
      onChange={this.handleChangeLink}
    />
  )

  render() {
    const { loading, error, allTags } = this.props
    if (loading) return <Loader />
    if (error) return <Text>Auth error</Text>
    return (
      <Card
        is="form"
        flexDirection="column"
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
      >
        {this.renderInput('link', 'Link', 'Insert link')}
        {this.renderInput('title', 'Title', 'Input Title')}
        {this.renderInput('preview', 'Preview', 'Input Preview')}
        {this.renderInput('imageUrl', 'Image Link', 'Insert image link')}
        <Box>{!loading && allTags.nodes.map(this.tagToButton)}</Box>
        <Button buttonStyle="primary" type="submit">
          Create
        </Button>
      </Card>
    )
  }
}

const ALL_TAG_QUERY = gql`
  query AllTagQuery {
    currentPerson {
      id
    }
    allTags {
      nodes {
        id
        name
      }
    }
  }
`

const ADD_LINK = gql`
  mutation createLink(
    $title: String!
    $way: String!
    $preview: String
    $imageUrl: String
    $personId: Int!
  ) {
    createLink(
      input: {
        link: {
          title: $title
          way: $way
          personId: $personId
          preview: $preview
          imageUrl: $imageUrl
        }
      }
    ) {
      link {
        linkId: id
      }
    }
  }
`

const ADD_LINK_TAG = gql`
  mutation createLinkTag($linkId: Int!, $tagId: Int!) {
    createLinkTag(input: { linkTag: { linkId: $linkId, tagId: $tagId } }) {
      clientMutationId
    }
  }
`

const props = ({ data: { loading, error, allTags, currentPerson } }) => ({
  loading,
  error,
  allTags,
  currentPerson
})

export default compose(
  graphql(ALL_TAG_QUERY, { props }),
  graphql(ADD_LINK, mutateProp('createLink')),
  graphql(ADD_LINK_TAG, mutateProp('createLinkTag'))
)(LinkForm)
