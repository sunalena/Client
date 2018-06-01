import React, { Component } from 'react'

import {
  InfiniteLoader,
  List,
  CellMeasurer,
  CellMeasurerCache,
  WindowScroller
} from 'react-virtualized'

const intialCache = {
  minHeight: 140,
  defaultHeight: 200,
  fixedWidth: true,
  fixedHeight: false
}

const listStyle = {
  width: '100%'
}

class InfiniteScrollList extends Component {
  cache = new CellMeasurerCache(intialCache)

  loadMoreRows = async ({ startIndex, stopIndex }) => {
    // console.log('loadMoreRows', startIndex, stopIndex)
    const { __typename, fetchMore, mainQuery } = this.props
    fetchMore({
      variables: {
        after: mainQuery.pageInfo.endCursor,
        first: stopIndex - startIndex + 1
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const {
          totalCount,
          edges: newEdges,
          pageInfo
        } = fetchMoreResult.mainQuery

        return {
          mainQuery: {
            __typename,
            totalCount,
            edges: [...previousResult.mainQuery.edges, ...newEdges],
            pageInfo
          }
        }
      }
    })
  }

  _isRowLoaded = ({ index }) => !!this.props.mainQuery.edges[index]

  _noRowsRenderer = <h1>No Links....</h1>

  _rowRenderer = ({ index, key, parent, style, columnIndex, isVisible }) => {
    const { mainQuery, render } = this.props
    const virtualizingList = mainQuery.edges
    return (
      <CellMeasurer
        cache={this.cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        {({ measure }) =>
          render({
            key,
            style,
            measure,
            isVisible,
            content:
              index < virtualizingList.length
                ? virtualizingList[index].node
                : { loading: true }
          })
        }
      </CellMeasurer>
    )
  }
  render() {
    const { mainQuery } = this.props
    if (!mainQuery) {
      console.log('mainQuery', 'undefined')
      return <div />
    }
    if (mainQuery.totalCount === 0) {
      console.log('totalCount', '0')
      return <div />
    }
    return (
      <InfiniteLoader
        isRowLoaded={this._isRowLoaded}
        loadMoreRows={this.loadMoreRows}
        rowCount={mainQuery.totalCount}
        threshold={8}
        minimumBatchSize={16}
      >
        {({ onRowsRendered, registerChild }) => (
          <WindowScroller>
            {({ height, width, isScrolling, onChildScroll, scrollTop }) => {
              this.cache.clearAll()
              return (
                <List
                  style={listStyle}
                  autoHeight
                  height={height}
                  width={width}
                  onRowsRendered={onRowsRendered}
                  noRowsRenderer={this._noRowsRenderer}
                  ref={registerChild}
                  isScrolling={isScrolling}
                  onScroll={onChildScroll}
                  rowCount={mainQuery.totalCount}
                  rowHeight={this.cache.rowHeight}
                  rowRenderer={this._rowRenderer}
                  scrollTop={scrollTop}
                  overscanRowCount={8}
                />
              )
            }}
          </WindowScroller>
        )}
      </InfiniteLoader>
    )
  }
}

export default InfiniteScrollList
