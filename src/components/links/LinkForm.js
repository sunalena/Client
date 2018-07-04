import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag.macro'
import { Form } from 'react-final-form'

import { Box, Card, Button, Input, CheckBadge, Text, Loader } from 'ui'
import { mutateProp } from 'utils'
import { subscription, renderInput } from 'ui/utils'
import { Field } from 'react-final-form'
import { SelectionField } from 'components/selectionField'
import LinkItem from './LinkItem'
import { objectDifference, getPatch } from 'utils'
import { intersection, difference, isEqual } from 'lodash'

const SelectAdapter = ({ input, meta, ...rest }) => (
  <SelectionField {...input} defaultValue={meta.initial} {...rest} />
)

const getTags = (linkTagsByLinkId = {}) => {
  console.log('getTags')

  const { nodes = [] } = linkTagsByLinkId
  return nodes.map(({ tagByTagId }) => tagByTagId.id)
}

// const combinTags = (tags) = tags.reduce((acc, el)=>acc+)

class LinkForm extends Component {
  state = {
    cSelected: [],
    hash: ''
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (!nextProps.loading && nextProps.hash !== state.hash) {
      const cSelected = getTags(nextProps.linkTagsByLinkId)
      return { cSelected, hash: nextProps.hash }
    }
    return null
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

  onSubmit = async values => {
    const { cSelected = [] } = this.state
    const {
      updateLink,
      createLinkTag,
      deleteLinkTag,
      initialValues,
      nodeId
    } = this.props
    const diff = objectDifference(values, initialValues)
    const linkPatch = getPatch(diff)

    try {
      if (Object.keys(diff).length > 0) {
        await updateLink({ nodeId, linkPatch })
      }
      const initSelected = getTags(this.props.linkTagsByLinkId)
      const add = difference(cSelected, initSelected)
      const remove = difference(initSelected, cSelected)
      add.forEach(tagId => {
        createLinkTag({ linkId: initialValues.id, tagId })
      })
      remove.forEach(tagId => {
        deleteLinkTag({ linkId: initialValues.id, tagId })
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

  render() {
    const { loading, error, allTags, initialValues } = this.props
    if (loading) return <Loader />
    if (error) return <Text>{JSON.stringify(error)}</Text>
    return (
      <Form
        onSubmit={this.onSubmit}
        initialValues={initialValues}
        subscription={subscription}
        render={({ handleSubmit, form: { reset }, submitting, pristine }) => (
          <Card is="form" flexDirection="column" onSubmit={handleSubmit}>
            {renderInput('way', 'Link', 'Insert link')}
            {renderInput('title', 'Title', 'Input Title')}
            {renderInput('preview', 'Preview', 'Input Preview')}
            {renderInput('imageUrl', 'Image Link', 'Insert image link')}
            <Field
              name="person"
              label="Person"
              component={SelectAdapter}
              type="text"
              placeholder="Select Person Id"
            />
            <Box>{!loading && allTags.nodes.map(this.tagToButton)}</Box>
            <Box>
              <Button type="submit" disabled={submitting}>
                Update
              </Button>
              <Button type="button" onClick={reset} disabled={pristine}>
                Reset
              </Button>
            </Box>
          </Card>
        )}
      />
    )
  }
}

const ALL_TAG_QUERY = gql`
  query AllTagQuery($id: Int!) {
    link: linkById(id: $id) {
      ...Link
    }
    allTags {
      nodes {
        ...Tag
      }
    }
  }
  ${LinkItem.fragments.link}
`

const UPDATE_LINK = gql`
  mutation updateLink($nodeId: ID!, $linkPatch: LinkPatch!) {
    updateLink(input: { nodeId: $nodeId, linkPatch: $linkPatch }) {
      clientMutationId
      link {
        ...Link
      }
    }
  }
  ${LinkItem.fragments.link}
`

const CREATE_LINK_TAG = gql`
  mutation createLinkTag($linkId: Int!, $tagId: Int!) {
    createLinkTag: createLinkTag(
      input: { linkTag: { linkId: $linkId, tagId: $tagId } }
    ) {
      clientMutationId
      linkTag {
        ...LinkTag
      }
    }
  }
  ${LinkItem.fragments.linkTag}
`

const DELETE_LINK_TAG = gql`
  mutation deleteLinkTag($linkId: Int!, $tagId: Int!) {
    deleteLinkTag: deleteLinkTagByLinkIdAndTagId(
      input: { linkId: $linkId, tagId: $tagId }
    ) {
      clientMutationId
    }
  }
`

const props = ({
  data: {
    loading,
    error,
    allTags,
    link: { linkTagsByLinkId, nodeId, ...initialValues } = {}
  }
}) => ({
  loading,
  error,
  allTags,
  initialValues,
  linkTagsByLinkId,
  nodeId,
  hash: Math.random().toString(36)
})

const config = {
  options: ({
    match: {
      params: { linkId: id }
    }
  }) => ({
    variables: { id, isList: false },
    fetchPolicy: 'cache-and-network'
  }),
  props
}

export default compose(
  graphql(ALL_TAG_QUERY, config),
  graphql(UPDATE_LINK, mutateProp('updateLink')),
  graphql(CREATE_LINK_TAG, mutateProp('createLinkTag')),
  graphql(DELETE_LINK_TAG, mutateProp('deleteLinkTag'))
)(LinkForm)
