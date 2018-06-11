import React, { Fragment } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag.macro'
import { Link } from 'react-router-dom'

import { InputWithLabel, Card, NavLink } from 'ui'

const tagToList = ({ id, name }) => (
  <NavLink key={id} as={Link} to={'/tags/' + id}>
    {name}
  </NavLink>
)

class TagForm extends React.Component {
  state = { createdTags: [] }

  handleSubmit = async event => {
    event.preventDefault()
    const {
      name: { value: name }
    } = event.target.elements
    const { data } = await this.props.createTag({ name })
    if (data.createTag.tag)
      this.setState({
        createdTags: [...this.state.createdTags, data.createTag.tag]
      })
  }

  render() {
    return (
      <Fragment>
        <Card is="form" onSubmit={this.handleSubmit}>
          <InputWithLabel
            id="title"
            type="text"
            name="name"
            label="Create New Tag"
            placeholder="Add Tag"
          />
        </Card>
        {this.state.createdTags.map(tagToList)}
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
