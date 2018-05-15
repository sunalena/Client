import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import SigninForm from './SigninForm'

export default () => (
  <Container> 
    <Row>
      <Col xs={8} className="mx-auto">
        <h3 className="mt-4">Signin</h3>
        <hr />
        <SigninForm />
      </Col>
    </Row>
  </Container>
)
