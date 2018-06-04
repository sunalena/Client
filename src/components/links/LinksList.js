import React, { Component } from 'react'

import { connect } from 'react-redux'
import { compose } from 'redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag.macro'
import InfiniteScroll from 'react-infinite-scroller'

import Loader from 'ui/Loader'
import LinkItem from './LinkItem'

class LinksList extends Component {
  // shouldComponentUpdate({ loading }, nextState) {
  //   return loading !== this.props.loading
  // }
  renderLink = props => (
    <LinkItem key={props.id} {...props} userId={this.props.userId} />
  )

  render() {
    const { loading, error, mainQuery, loadMore } = this.props
    if (loading) return <Loader />
    if (error) return <h3>Error</h3>

    const { nodes = [], pageInfo: { hasNextPage } = {} } = mainQuery
    return (
      <InfiniteScroll
        loadMore={loadMore}
        hasMore={hasNextPage}
        initialLoad={false}
        loader={<p key={'00'}>Loading...</p>}
      >
        {nodes.map(this.renderLink)}
      </InfiniteScroll>
    )
  }
}

const ALL_POSTS = gql`
  query searchLink($searchValue: String!, $first: Int!, $after: Cursor) {
    mainQuery: searchLink(search: $searchValue, first: $first, after: $after) {
      nodes {
        ...Link
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
  loadMore: () =>
    fetchMore({
      variables: { after: mainQuery.pageInfo.endCursor },
      updateQuery: (previousResult = {}, { fetchMoreResult = {} }) => {
        const previousMainQuery = previousResult.mainQuery || {}
        const currentMainQuery = fetchMoreResult.mainQuery || {}
        const previousNodes = previousMainQuery.nodes || []
        const currentNodes = currentMainQuery.nodes || []
        return {
          ...previousResult,
          mainQuery: {
            ...previousMainQuery,
            nodes: [...previousNodes, ...currentNodes],
            pageInfo: currentMainQuery.pageInfo
          }
        }
      }
    })
})

const configObject = {
  options: ({ endCursor, searchValue = '' }) => ({
    variables: { searchValue, first: 5 }
    // fetchPolicy: 'network-only'
  }),
  // force: true,
  props
}

const mapState = ({ navBar, auth }) => ({
  searchValue: '',
  userId: auth.userId
})

export default compose(
  connect(mapState),
  graphql(ALL_POSTS, configObject)
)(LinksList)
