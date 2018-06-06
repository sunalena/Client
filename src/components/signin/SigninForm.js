import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { withApollo, graphql, compose } from 'react-apollo'
import gql from 'graphql-tag.macro'

import { signinSuccess } from 'redux/modules/auth'
import { Input, Card, Button } from 'ui'

class SigninForm extends Component {
  handleSubmit = async event => {
    event.preventDefault()
    const { client, signinSuccess, authenticate, history } = this.props
    const inputs = event.target.elements
    const login = inputs.login.value
    const password = inputs.password.value
    try {
      const { data } = await authenticate({ login, password })
      const token = data.authenticate.jwtToken
      const userId = data.authenticate.query.currentPerson.userId
      if (token && userId) {
        signinSuccess(token, userId)
        await client.resetStore()
        history.replace('/')
      } else {
        console.log('undef user')
      }
    } catch (error) {
      console.log('there was an error sending the query', error)
    }
  }

  render = () => (
    <Card is="form" onSubmit={this.handleSubmit}>
      <Input
        id="login"
        type="text"
        name="login"
        label="Login"
        placeholder="login"
      />
      <Input
        id="password"
        type="password"
        name="password"
        label="Password"
        placeholder="Password"
      />
      <Button>Signin</Button>
    </Card>
  )
}

const AUTH_MUTATION = gql`
  mutation authenticate($login: String!, $password: String!) {
    authenticate(input: { login: $login, password: $password }) {
      jwtToken
      query {
        currentPerson {
          userId: id
        }
      }
    }
  }
`

const configObject = {
  props: ({ mutate }) => ({
    authenticate: variables =>
      mutate({
        variables
      })
  })
}

export default compose(
  withRouter,
  withApollo,
  connect(
    null,
    { signinSuccess }
  ),
  graphql(AUTH_MUTATION, configObject)
)(SigninForm)
