import React, { Component, Fragment } from 'react'

import { connect } from 'react-redux'
import { compose } from 'redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag.macro'
import InfiniteScroll from 'react-infinite-scroller'

import { Loader, Heading } from 'ui'
import { SearchInput } from 'components/SearchInput'

import LinkItem from './LinkItem'

class LinksList extends Component {
  // shouldComponentUpdate({ loading }, nextState) {
  //   return loading !== this.props.loading
  // }
  renderLink = props => (
    <LinkItem key={props.id} {...props} userId={this.props.userId} />
  )
  handleSearch = event => {
    event.preventDefault()
    const { history, location } = this.props
    const inputs = event.target.elements
    const search = inputs.search.value
    location.search = search ? new URLSearchParams({ search }).toString() : ''
    history.push(location)
  }

  render() {
    const {
      loading,
      error,
      mainQuery = {},
      loadMore,
      location,
      history,
      refetch
    } = this.props
    const search = new URLSearchParams(location.search).get('search')
    const { nodes = [], pageInfo: { hasNextPage } = {} } = mainQuery
    return (
      <Fragment>
        <SearchInput
          location={location}
          history={history}
          defaultValue={search}
          refetch={refetch}
        />
        {loading && <Loader />}
        {error && <Heading h3="true">Error</Heading>}
        {!loading &&
          !error && (
            <InfiniteScroll
              loadMore={loadMore}
              hasMore={hasNextPage}
              initialLoad={false}
              loader={<p key={'00'}>Loading...</p>}
            >
              {nodes.map(this.renderLink)}
            </InfiniteScroll>
          )}
      </Fragment>
    )
  }
}

const ALL_POSTS_BY_TAG = gql`
  query searchLinkTag(
    $search: String!
    $tagId: Int!
    $first: Int!
    $after: Cursor
  ) {
    mainQuery: searchLinkTag(
      search: $search
      condTagId: $tagId
      first: $first
      after: $after
    ) {
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

const ALL_POSTS = gql`
  query searchLink(
    $search: String!
    $first: Int!
    $after: Cursor
    $personId: Int
  ) {
    mainQuery: searchLink(
      search: $search
      condPersonId: $personId
      first: $first
      after: $after
    ) {
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

const props = ({
  data: { loading, error, mainQuery, fetchMore, refetch }
}) => ({
  loading,
  error,
  fetchMore,
  mainQuery,
  refetch,
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
  options: ({ location, match }) => {
    const search = new URLSearchParams(location.search).get('search') || ''
    return {
      variables: { search, first: 5, ...match.params }
      // fetchPolicy: 'network-only'
    }
  },
  // force: true,
  props
}

const mapState = ({ navBar, auth }) => ({
  search: '',
  userId: auth.userId
})

export default compose(
  connect(mapState),
  graphql(ALL_POSTS, configObject)
)(LinksList)

export const LinkListByTag = compose(
  connect(mapState),
  graphql(ALL_POSTS_BY_TAG, configObject)
)(LinksList)
