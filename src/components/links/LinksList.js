import React, { Component } from 'react'

import { connect } from 'react-redux'
import { compose } from 'redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import InfiniteScrollList from '../common/InfiniteScrollList'
import Loader from '../common/Loader'
import LinkItem from './LinkItem'

class LinksList extends Component {
  // shouldComponentUpdate({ loading }, nextState) {
  //   return loading !== this.props.loading
  // }

  renderLink = ({ key, style, content, ...rest }) => (
    <div key={key} style={style}>
      <LinkItem {...rest} {...content} userId={this.props.userId} />
    </div>
  )

  render() {
    const { loading, userId, ...props } = this.props
    return loading ? (
      <Loader />
    ) : (
      <InfiniteScrollList {...props} render={this.renderLink} />
    )
  }
}

const __typename = 'LinkConnection'

const ALL_POSTS = gql`
  query searchLink($searchValue: String!, $first: Int!, $after: Cursor) {
    mainQuery: searchLink(search: $searchValue, first: $first, after: $after) {
      totalCount
      edges {
        cursor
        node {
          ...Link
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${LinkItem.fragments.link}
`

const props = ({ data: { loading, error, mainQuery, fetchMore } }) => ({
  loading,
  error,
  fetchMore,
  mainQuery,
  __typename
})

const configObject = {
  options: ({ endCursor, searchValue = '' }) => ({
    variables: {
      first: 16,
      after: endCursor || null,
      searchValue
    }
    // fetchPolicy: 'network-only'
  }),
  force: true,
  props
}

const mapStateToProps = ({ navBar, auth }) => ({
  // searchValue: 'Asperiores',
  searchValue: '',

  userId: auth.userId
})

export default compose(
  connect(mapStateToProps),
  graphql(ALL_POSTS, configObject)
)(LinksList)
