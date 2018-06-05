import React from 'react'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withApollo, graphql, compose } from 'react-apollo'
import gql from 'graphql-tag.macro'

import { Card, Button } from 'rebass'
import { Input } from 'ui'
import { signinSuccess } from 'redux/modules/auth'

class SignupForm extends React.PureComponent {
  handleSubmit = ({
    client,
    signinSuccess,
    signUp,
    history
  }) => async event => {
    // console.log(event)
    // return true
    event.preventDefault()
    const {
      firstName: { value: firstName },
      lastName: { value: lastName },
      email: { value: email },
      login: { value: login },
      password: { value: password }
    } = event.target.elements
    try {
      const { data } = await signUp({
        firstName,
        lastName,
        email,
        login,
        password
      })
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
    <Card is="form" onSubmit={this.handleSubmit(this.props)}>
      <Input
        id="firstName"
        type="text"
        name="firstName"
        label="First name"
        placeholder="Input first name"
      />
      <Input
        id="lastName"
        type="text"
        name="lastName"
        label="Last name"
        placeholder="Input last name"
      />
      <Input
        id="email"
        type="email"
        name="email"
        label="E-mail"
        placeholder="Input e-mail"
      />
      <Input
        id="login"
        type="text"
        name="login"
        label="Login"
        placeholder="Input login"
      />
      <Input
        id="password"
        type="password"
        name="password"
        label="Password"
        placeholder="Input password"
      />
      <Button>Signup</Button>
    </Card>
  )
}

const REG_MUTATION = gql`
  mutation register(
    $firstName: String!
    $lastName: String!
    $login: String!
    $email: String!
    $password: String!
  ) {
    register(
      input: {
        firstName: $firstName
        lastName: $lastName
        login: $login
        email: $email
        password: $password
      }
    ) {
      person {
        id
      }
    }
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
    signUp: variables =>
      mutate({
        variables
      })
  })
}

const mapDispatchToProps = dispatch => ({
  signinSuccess: bindActionCreators(signinSuccess, dispatch)
})

export default compose(
  withRouter,
  withApollo,
  connect(
    null,
    mapDispatchToProps
  ),
  graphql(REG_MUTATION, configObject)
)(SignupForm)
