import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { withApollo, graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { signinSuccess } from '../../redux/modules/auth'

class SigninForm extends Component {
  handleSubmit = async event => {
    const { client, signinSuccess, authenticate, history } = this.props
    event.preventDefault()
    const inputs = event.target.elements
    const login = inputs.login.value
    const password = inputs.password.value
    try {
      const { data } = await authenticate({ login, password })
      const token = data.authenticate.jwtToken
      const userId = data.authenticate.query.currentPerson.userId
      if (token && userId) {
        signinSuccess(token, userId)
        client.resetStore().then(() => history.replace('/'))
      } else {
        console.log('undef user')
      }
    } catch (error) {
      console.log('there was an error sending the query', error)
    }
  }

  render = () => (
    <Form onSubmit={this.handleSubmit}>
      <FormGroup>
        <Label for="login">Login</Label>
        <Input name="login" id="login" placeholder="login" />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
      </FormGroup>
      <FormGroup>
        <Button>Signin</Button>
      </FormGroup>
    </Form>
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
  connect(null, { signinSuccess }),
  graphql(AUTH_MUTATION, configObject)
)(SigninForm)
