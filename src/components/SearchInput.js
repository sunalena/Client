import React, { Component } from 'react'
import { Input, Flex } from 'ui'

export class SearchInput extends Component {
  handleSearch = event => {
    event.preventDefault()
    const { history, location } = this.props
    const inputs = event.target.elements
    const search = inputs.search.value
    location.search = search ? new URLSearchParams({ search }).toString() : ''
    history.push(location)
  }

  render() {
    const { defaultValue } = this.props
    return (
      <Flex is="form" onSubmit={this.handleSearch} w={1}>
        <Input
          id="search"
          name="search"
          defaultValue={defaultValue}
          type="text"
          placeholder="Enter search query"
        />
      </Flex>
    )
  }
}
