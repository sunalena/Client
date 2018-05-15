import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import {
  Form,
  FormGroup,
  Label,
  Input,
  Popover,
  PopoverHeader,
  PopoverBody
} from 'reactstrap'

import Loader from '../common/Loader'

const wordToList = word => <div key={word.nodeId}>{word.word}</div>

class TagPage extends Component {
  state = { createdWords: [], popoverOpen: false, message: '' }

  toggle = message => {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
      message
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
    const wordInput = event.target.elements.word
    const tagId = this.props.data ? this.props.data.tag.id : undefined
    try {
      const { data } = await this.props.createWord({
        tagId,
        word: wordInput.value
      })
      if (data.createWordNTag.wordNTag) {
        this.setState({
          createdWords: [
            ...this.state.createdWords,
            data.createWordNTag.wordNTag
          ]
        })
        wordInput.value = ''
      }
    } catch (err) {
      this.toggle(err.message)
    }
  }

  render() {
    const { data: { loading, tag } } = this.props
    return loading ? (
      <Loader />
    ) : (
      <div>
        <h2>{tag.name}</h2>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="tagForm">Add words</Label>
            <Input type="text" name="word" id="word" placeholder="add word" />
          </FormGroup>
        </Form>
        <Popover
          placement="top"
          isOpen={this.state.popoverOpen}
          target="word"
          toggle={this.toggle}
        >
          <PopoverHeader>Error</PopoverHeader>
          <PopoverBody>{this.state.message}</PopoverBody>
        </Popover>
        {tag.words.nodes.map(wordToList)}
        {this.state.createdWords.map(wordToList)}
      </div>
    )
  }
}

const TAG_BY_ID_QUERY = gql`
  query TagByIdQuery($id: Int!) {
    tag: tagById(id: $id) {
      nodeId
      id
      name
      words: wordNTagsByTagId {
        nodes {
          nodeId
          word
          tagId
        }
      }
    }
  }
`

const CREATE_WORD_MUTATION = gql`
  mutation createWord($tagId: Int!, $word: String!) {
    createWordNTag(input: { wordNTag: { tagId: $tagId, word: $word } }) {
      wordNTag {
        nodeId
        word
        tagId
      }
    }
  }
`

const config = {
  options: ({ match: { params: { tagId: id } } }) => ({
    variables: { id },
    fetchPolicy: 'network-only'
  })
}

const MutationConfig = {
  props: ({ mutate }) => ({
    createWord: variables =>
      mutate({
        variables
      })
  })
}

export default compose(
  graphql(TAG_BY_ID_QUERY, config),
  graphql(CREATE_WORD_MUTATION, MutationConfig)
)(TagPage)
