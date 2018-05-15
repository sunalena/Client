import React, { Fragment } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Form, FormGroup, Label, Input, ListGroup } from 'reactstrap'
import { Link } from 'react-router-dom'

const tagToList = ({ id, name }) => (
  <Link key={id} to={'/tags/' + id}>
    {name}
  </Link>
)

class TagForm extends React.Component {
  state = { createdTags: [] }

  handleSubmit = async event => {
    event.preventDefault()
    const { name: { value: name } } = event.target.elements
    const { data } = await this.props.createTag({ name })
    if (data.createTag.tag)
      this.setState({
        createdTags: [...this.state.createdTags, data.createTag.tag]
      })
  }

  render() {
    console.log(this.props)
    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="tagForm">Create New Tag</Label>
            <Input type="text" name="name" id="name" placeholder="add tag" />
          </FormGroup>
        </Form>
        {<ListGroup>{this.state.createdTags.map(tagToList)}</ListGroup>}
      </Fragment>
    )
  }
}

const CREATE_TAG_MUTATION = gql`
  mutation createTag($name: String!) {
    createTag(input: { tag: { name: $name } }) {
      tag {
        nodeId
        id
        name
      }
    }
  }
`
const configObject = {
  props: ({ mutate }) => ({
    createTag: variables =>
      mutate({
        variables
      })
  })
}

export default graphql(CREATE_TAG_MUTATION, configObject)(TagForm)
