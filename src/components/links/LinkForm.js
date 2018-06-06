import React from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag.macro'

import { Box, Card, Button, Input, CheckBadge } from 'ui'

class LinkForm extends React.Component {
  state = {
    cSelected: [],
    link: '',
    title: '',
    preview: '',
    image: ''
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
    const { createLink } = this.props
    const inputs = event.target.elements
    const title = inputs.title.value
    const way = inputs.link.value
    const personId = 4

    try {
      createLink({ title, way, personId })
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

  render() {
    const { loading, allTags } = this.props
    return (
      <Card is="form" onSubmit={this.handleSubmit}>
        <Input
          id="link"
          type="text"
          name="link"
          label="Link"
          placeholder="Insert link"
          onChange={this.handleChangeLink}
        />
        <Input
          id="title"
          type="text"
          name="title"
          label="Title"
          placeholder="Input Title"
          onChange={this.handleChangeLink}
        />
        <Input
          id="preview"
          type="textarea"
          name="preview"
          textarea={true}
          value=""
          label="Preview"
          onChange={this.handleChangeLink}
        />
        <Input
          id="image"
          type="link"
          name="image"
          label="Image Link"
          placeholder="Insert image link"
          onChange={this.handleChangeLink}
        />
        <Box>{!loading && allTags.nodes.map(this.tagToButton)}</Box>
        <Button>Submit</Button>
      </Card>
    )
  }
}

const ALL_TAG_QUERY = gql`
  query AllTagQuery {
    allTags {
      nodes {
        id
        name
      }
    }
  }
`

const ADD_LINK = gql`
  mutation createLink($title: String!, $way: String!, $personId: Int!) {
    createLink(
      input: { link: { title: $title, way: $way, personId: $personId } }
    ) {
      clientMutationId
    }
  }
`

const configObject = {
  props: ({ mutate }) => ({
    createLink: variables =>
      mutate({
        variables
      })
  })
}

const props = ({ data: { loading, error, allTags } }) => ({
  loading,
  error,
  allTags
})

export default compose(
  graphql(ADD_LINK, configObject),
  graphql(ALL_TAG_QUERY, { props })
)(LinkForm)
