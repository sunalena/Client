import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { withApollo, graphql, compose } from 'react-apollo'
import gql from 'graphql-tag.macro'
import { Form } from 'react-final-form'

import { signinSuccess } from 'redux/modules/auth'
import { Card, Button } from 'ui'
import { subscription, renderInput } from 'ui/utils'

class SigninForm extends Component {
  onSubmit = async values => {
    const { client, signinSuccess, authenticate, history } = this.props
    try {
      const { data } = await authenticate({ ...values })
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

  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        subscription={subscription}
        render={({ handleSubmit, submitting }) => (
          <Card
            is="form"
            onSubmit={handleSubmit}
            flexDirection="column"
            maxWidth={400}
            mx="auto"
          >
            {renderInput('login', 'Login', 'Input login')}
            {renderInput('password', 'Password', 'Input password', 'password')}
            <Button disabled={submitting}>Signin</Button>
          </Card>
        )}
      />
    )
  }
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
