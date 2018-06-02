import React from 'react'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withApollo, graphql, compose } from 'react-apollo'
import gql from 'graphql-tag.macro'

import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { signinSuccess } from '../../redux/modules/auth'

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
    <Form onSubmit={this.handleSubmit(this.props)}>
      <FormGroup>
        <Label className="control-label">First name</Label>
        <Input name="firstName" type="text" className="form-control" />
      </FormGroup>
      <FormGroup>
        <Label className="control-label">Last name</Label>
        <Input name="lastName" type="text" className="form-control" />
      </FormGroup>
      <FormGroup>
        <Label className="control-label">E-mail</Label>
        <Input name="email" type="email" className="form-control" />
      </FormGroup>
      <FormGroup>
        <Label className="control-label">login</Label>
        <Input name="login" type="text" className="form-control" />
      </FormGroup>
      <FormGroup>
        <Label className="control-label">password</Label>
        <Input name="password" type="password" className="form-control" />
      </FormGroup>
      <FormGroup>
        <Button>Signup</Button>
      </FormGroup>
    </Form>
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
  connect(null, mapDispatchToProps),
  graphql(REG_MUTATION, configObject)
)(SignupForm)
