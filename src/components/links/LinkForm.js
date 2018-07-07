import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag.macro'
import { Form, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
import { difference } from 'lodash'

import { Box, Card, Button, CheckBadge as CheckBadgeC, Text } from 'ui'
import { mutateProp, objectDifference, getPatch } from 'utils'
import { subscription, renderInput } from 'ui/utils'
import { SelectionField } from 'components/selectionField'
import LinkItem from './LinkItem'

const CheckBadge = ({ input, ...props }) => (
  <CheckBadgeC
    {...input}
    {...props}
    checked={input.value.checked}
    onClick={() =>
      input.onChange({ ...input.value, checked: !input.value.checked })
    }
  >
    {input.value.name}
  </CheckBadgeC>
)

const SelectAdapter = ({ input, meta, ...rest }) => (
  <SelectionField {...input} defaultValue={meta.initial} {...rest} />
)

class LinkForm extends Component {
  onSubmit = async ({ tags, ...values }) => {
    const {
      updateLink,
      createLinkTag,
      deleteLinkTag,
      initialValues: { tags: oldTags, ...initialValues } = {},
      nodeId,
      refetch
    } = this.props
    const diff = objectDifference(values, initialValues)
    const linkPatch = getPatch(diff)
    const modifiedTags = difference(tags, oldTags)

    try {
      modifiedTags.forEach(tag => {
        const tagId = tag.id
        const linkId = initialValues.id
        if (tag.checked) {
          createLinkTag({ linkId, tagId })
        } else {
          deleteLinkTag({ linkId, tagId })
        }
      })
      if (Object.keys(diff).length > 0) {
        await updateLink({ nodeId, linkPatch })
      } else {
        refetch()
      }
    } catch (error) {
      console.log('there was an error sending the query', error)
    }
  }

  render() {
    const { error, initialValues } = this.props
    if (error) return <Text>{JSON.stringify(error)}</Text>
    return (
      <Form
        onSubmit={this.onSubmit}
        initialValues={initialValues}
        subscription={subscription}
        mutators={{ ...arrayMutators }}
        render={({ handleSubmit, form: { reset }, submitting, pristine }) => (
          <Card is="form" flexDirection="column" onSubmit={handleSubmit}>
            {renderInput('way', 'Link', 'Insert link')}
            {renderInput('title', 'Title', 'Input Title')}
            {renderInput(
              'preview',
              'Preview',
              'Input Preview',
              'text',
              true,
              false
            )}
            {renderInput(
              'imageUrl',
              'Image Link',
              'Insert image link',
              null,
              null,
              false
            )}
            <Field
              name="person"
              label="Person"
              component={SelectAdapter}
              type="text"
              placeholder="Select Person Id"
            />
            <Box>
              <FieldArray name="tags">
                {({ fields }) =>
                  fields.map(name => (
                    <Field
                      key={name}
                      name={name}
                      type="checkbox"
                      component={CheckBadge}
                      my={1}
                    />
                  ))
                }
              </FieldArray>
            </Box>
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

const checkArrays = (allTags, tags) => {
  if (!allTags) return []
  const check = tags.nodes.map(el => el.tagId)
  return allTags.nodes.map(el => ({
    ...el,
    checked: check.indexOf(el.id) >= 0
  }))
}

const props = ({
  data: {
    loading,
    error,
    allTags,
    link: { linkTagsByLinkId, nodeId, ...linkValues } = {},
    refetch
  }
}) => {
  return {
    loading,
    error,
    allTags,
    initialValues: {
      ...linkValues,
      tags: checkArrays(allTags, linkTagsByLinkId)
    },
    linkTagsByLinkId,
    nodeId,
    refetch
  }
}

const config = {
  options: ({
    match: {
      params: { linkId: id }
    }
  }) => ({
    variables: { id, isList: false }
    // fetchPolicy: 'cache-and-network'
  }),
  props
}

export default compose(
  graphql(ALL_TAG_QUERY, config),
  graphql(UPDATE_LINK, mutateProp('updateLink')),
  graphql(CREATE_LINK_TAG, mutateProp('createLinkTag')),
  graphql(DELETE_LINK_TAG, mutateProp('deleteLinkTag'))
)(LinkForm)
