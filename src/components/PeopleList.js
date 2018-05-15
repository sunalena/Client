import React, { Component } from 'react'

import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Loader from './common/Loader'

const ListItem = ({firstName}) => <div>{firstName}</div>

const renderListItem = ({nodeId, ...props}) => <ListItem key={nodeId} {...props}/>

class LinksList extends Component {

  handleClick = ()=>{
    this.props.data.fetchMore()
  }
  render() {
    const { loading, allPeople, ...props } = this.props.data
    console.log('LinksList',loading, props)
    return loading ? (
      <Loader />
    ) : 
    allPeople.nodes.map(renderListItem)
  }
}

const ALL_PEOPLE = gql`
{
  allPeople{
    nodes{
      nodeId
      firstName
      lastName
      about
      fullName
    }
  }
}
`

export default graphql(ALL_PEOPLE)(LinksList)
