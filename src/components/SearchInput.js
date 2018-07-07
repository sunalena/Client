import React, { Component } from 'react'
import { Input, Box, Flex, Button } from 'ui'

export class SearchInput extends Component {
  handleSearch = event => {
    event.preventDefault()
    const { history, location, refetch } = this.props
    const inputs = event.target.elements
    const search = inputs.search.value
    const newSearch = new URLSearchParams({ search }).toString()

    const oldSearch = location.search.slice(1) || 'search='
    if (newSearch !== oldSearch) {
      location.search = search ? newSearch : ''
      history.push(location)
    } else if (refetch) {
      refetch()
    }
  }

  render() {
    const { defaultValue } = this.props
    return (
      <Flex is="form" onSubmit={this.handleSearch}>
        <Box is="label" w={1} htmlFor="search">
          <Input
            w={1}
            id="search"
            name="search"
            defaultValue={defaultValue}
            type="text"
            placeholder="Enter search query"
          />
        </Box>
        <Button ml={2} type="submit">
          Search
        </Button>
      </Flex>
    )
  }
}
