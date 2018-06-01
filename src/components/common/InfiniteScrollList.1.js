import React, { Component } from 'react'

import {
  InfiniteLoader,
  List,
  CellMeasurer,
  CellMeasurerCache,
  WindowScroller
} from 'react-virtualized'

const loadMoreRows = ({ __typename, fetchMore, mainQuery }) => ({
  startIndex,
  stopIndex
}) =>
  console.log('loadMoreRows', startIndex, stopIndex) ||
  fetchMore({
    variables: {
      after: mainQuery.pageInfo.endCursor,
      first: stopIndex - startIndex + 1
    },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      const totalCount = fetchMoreResult.mainQuery.totalCount
      const newEdges = fetchMoreResult.mainQuery.edges
      const pageInfo = fetchMoreResult.mainQuery.pageInfo
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

const _isRowLoaded = virtualizingList => ({ index }) =>
  !!virtualizingList[index]

const _noRowsRenderer = () => <h1>No Links....</h1>

const _rowRenderer = ({ virtualizingList, render, cache }) => ({
  index,
  key,
  parent,
  style: { left, height, ...style },
  columnIndex
}) => {
  console.log('_rowRenderer', index)
  const content = measure =>
    render({
      key,
      style,
      onLoad: measure,
      content:
        index < virtualizingList.length
          ? virtualizingList[index].node
          : { loading: true }
    })

  return (
    <CellMeasurer
      cache={cache}
      columnIndex={columnIndex}
      key={key}
      parent={parent}
      rowIndex={index}
      children={({ measure }) => content(measure)}
    />
  )
}

const intialCache = {
  minHeight: 140,
  defaultHeight: 200,
  fixedWidth: true
}

class InfiniteScrollList extends Component {
  render() {
    const { __typename, fetchMore, mainQuery, render } = this.props
    if (!mainQuery) {
      console.log('mainQuery', 'undefined')
      return <div />
    }
    const virtualizingList = mainQuery.edges
    // const cache = new CellMeasurerCache(intialCache)
    return (
      <InfiniteLoader
        isRowLoaded={_isRowLoaded(virtualizingList)}
        loadMoreRows={loadMoreRows({ __typename, fetchMore, mainQuery })}
        rowCount={mainQuery.totalCount}
        threshold={3}
        minimumBatchSize={8}
      >
        {({ onRowsRendered, registerChild }) => (
          <WindowScroller>
            {({ height, width, isScrolling, onChildScroll, scrollTop }) => {
              console.log('WindowScroller', isScrolling)
              const cache = new CellMeasurerCache(intialCache)

              return (
                <List
                  style={{
                    width: '100%'
                  }}
                  // deferredMeasurementCache={cache}
                  autoHeight
                  height={height}
                  width={width}
                  onRowsRendered={onRowsRendered}
                  noRowsRenderer={_noRowsRenderer}
                  ref={registerChild}
                  isScrolling={isScrolling}
                  onScroll={onChildScroll}
                  rowCount={mainQuery.totalCount}
                  rowHeight={cache.rowHeight}
                  rowRenderer={_rowRenderer({
                    virtualizingList,
                    render,
                    cache
                  })}
                  scrollTop={scrollTop}
                  overscanRowCount={3}
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
