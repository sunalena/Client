import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { withApollo, graphql, compose } from 'react-apollo'
import gql from 'graphql-tag.macro'
import { Form } from 'react-final-form'

import { Card, Button, Container } from 'ui'
import { signinSuccess } from 'redux/modules/auth'
import { subscription, renderInput } from 'ui/utils'

const validate = values => {
  const errors = {}
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords must match'
  }
  return errors
}

class SignupForm extends React.PureComponent {
  onSubmit = async values => {
    console.log('values', values)
    const { client, signinSuccess, signUp, history } = this.props
    try {
      const { data } = await signUp({
        ...values,
        lastName: '',
        email: 'test@test.com'
      })
      const token = data.authenticate.jwtToken
      const userId = data.authenticate.query.currentPerson.userId
      const userName = data.authenticate.query.currentPerson.fullName

      if (token && userId) {
        signinSuccess(token, userId, userName)
        await client.resetStore()
        history.replace('/')
      } else {
        console.log('undef user')
      }
    } catch (error) {
      console.log('there was an error sending the query', error)
    }
  }

  checkConfirm = value => (value ? undefined : 'Required')

  render() {
    return (
      <Container maxWidth={400} color="base">
        <Form
          onSubmit={this.onSubmit}
          subscription={subscription}
          validate={validate}
          render={({ handleSubmit, submitting, values }) => (
            <Card
              is="form"
              onSubmit={handleSubmit}
              flexDirection="column"
              maxWidth={400}
              mx="auto"
            >
              {renderInput('login', 'Login *', 'Input login')}
              {renderInput('firstName', 'Name *', 'Input name')}
              {renderInput(
                'password',
                'Password *',
                'Input password',
                'password'
              )}
              {renderInput(
                'confirmPassword',
                'Confirm password *',
                'Confirm password',
                'password'
              )}
              <Button disabled={submitting}>Signup</Button>
            </Card>
          )}
        />
      </Container>
    )
  }
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
        fullName
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

export default compose(
  withRouter,
  withApollo,
  connect(
    null,
    { signinSuccess }
  ),
  graphql(REG_MUTATION, configObject)
)(SignupForm)
