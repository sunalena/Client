import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { Container, Row, Col } from 'reactstrap'
import Navbar from './components/navbar'
import GreetingPage from './components/GreetingPage'
import InstructionPage from './components/InstructionPage'
import SigninPage from './components/signin'
import SignupPage from './components/signup'
import NotFoundPage from './components/NotFoundPage'
import LinksPage from './components/links'
import TagsPage from './components/tags'

const App = () => (
  <div>
    <Navbar brand="Linkhub" />
    <Container>
      <Row>
        <Col xs={{ size: 12 }} lg={{ size: 8, offset: 2 }}>
          <Switch>
            <Route exact path="/" component={GreetingPage} />
            <Route path="/links" component={LinksPage} />
            <Route path="/tags" component={TagsPage} />
            <Route exact path="/signin/" component={SigninPage} />
            <Route exact path="/signup/" component={SignupPage} />
            <Route exact path="/instruction/" component={InstructionPage} />
            <Redirect from="/signout" to="/signin" />
            <Route component={NotFoundPage} />
          </Switch>
        </Col>
      </Row>
    </Container>
  </div>
)

export default App
