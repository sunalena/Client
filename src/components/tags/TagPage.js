import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag.macro'

import {
  Loader,
  InputWithLabel,
  Message,
  Close,
  Box,
  Card,
  Text,
  Heading
} from 'ui'

const wordToList = word => <Text key={word.nodeId}>{word.word}</Text>

class TagPage extends Component {
  state = { createdWords: [], messageOpen: false, message: '' }

  openMessage = message => {
    this.setState({
      messageOpen: true,
      message
    })
  }
  closeMessage = () => {
    this.setState({
      messageOpen: false
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
    const wordInput = event.target.elements.word
    const { data = {}, createWord } = this.props
    const tagId = data && data.tag ? data.tag.id : undefined
    try {
      const { data: reciveData } = await createWord({
        tagId,
        word: wordInput.value
      })
      if (reciveData.createWordNTag.wordNTag) {
        this.setState({
          createdWords: [
            ...this.state.createdWords,
            reciveData.createWordNTag.wordNTag
          ]
        })
        wordInput.value = ''
      }
    } catch (err) {
      this.openMessage(err.message)
    }
  }

  render() {
    const {
      data: { loading, tag }
    } = this.props
    const { messageOpen, message } = this.state
    if (loading) return <Loader />
    return (
      <Box>
        <Heading h4="true">{tag.name}</Heading>
        <Card is="form" onSubmit={this.handleSubmit}>
          {messageOpen && (
            <Message>
              {message} <Box mx="auto" /> <Close onClick={this.closeMessage} />
            </Message>
          )}
          <InputWithLabel
            id="word"
            type="text"
            name="word"
            label="Add words"
            placeholder="Add Word"
            onChange={this.handleChangeLink}
          />
        </Card>
        {tag.words.nodes.map(wordToList)}
        {this.state.createdWords.map(wordToList)}
      </Box>
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
  options: ({
    match: {
      params: { tagId: id }
    }
  }) => ({
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
