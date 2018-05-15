import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import SignupForm from './SignupForm'

export default () => (
  <Container>
    <Row>
      <Col xs={8}>
        <h3>Signup</h3>
        <hr />
        <SignupForm />
      </Col>
    </Row>
  </Container>
)
