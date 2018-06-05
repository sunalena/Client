import React, { Fragment } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import {
  Navbar,
  SigninPage,
  SignupPage,
  LinksPage,
  TagsPage,
  GreetingPage,
  InstructionPage,
  NotFoundPage
} from './components'

const App = () => (
  <Fragment>
    <Navbar brand="Linkhub" />
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
  </Fragment>
)

export default App
