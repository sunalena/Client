import React from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag.macro'

import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

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

  onCheckboxBtnClick1 = selected => {
    console.log(selected)
    const index = this.state.cSelected.indexOf(selected)
    if (index < 0) {
      this.state.cSelected.push(selected)
    } else {
      this.state.cSelected.splice(index, 1)
    }
    this.setState({ cSelected: [...this.state.cSelected] })
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

  tagToButton = tag =>
    console.log(this.state.cSelected) || (
      <Button
        key={tag.id}
        style={{ margin: 5 }}
        id={tag.id}
        color={this.state.cSelected.includes(tag.id) ? 'primary' : 'default'}
        onClick={this.onCheckboxBtnClick}
        active={this.state.cSelected.includes(tag.id)}
      >
        {tag.name}
      </Button>
    )

  render() {
    const { loading, allTags } = this.props
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="linkForm">Link</Label>
          <Input
            type="link"
            name="link"
            id="link"
            placeholder="insert link"
            onChange={this.handleChangeLink}
          />
        </FormGroup>
        <FormGroup>
          <Label for="linkForm">Title</Label>
          <Input
            type="text"
            name="title"
            id="title"
            placeholder="Input Title"
            onChange={this.handleChangeLink}
          />
        </FormGroup>
        <FormGroup>
          <Label for="linkForm">Preview</Label>
          <Input
            type="textarea"
            name="preview"
            id="preview"
            onChange={this.handleChangeLink}
          />
        </FormGroup>
        <FormGroup>
          <Label for="linkForm">Image Link</Label>
          <Input
            type="link"
            name="image"
            id="image"
            placeholder="insert image link"
            onChange={this.handleChangeLink}
          />
        </FormGroup>
        <FormGroup>{!loading && allTags.nodes.map(this.tagToButton)}</FormGroup>
        <Button>Submit</Button>
      </Form>
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
