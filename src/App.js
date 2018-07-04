import React, { Fragment } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import {
  Navbar,
  SigninPage,
  SignupPage,
  LinksPage,
  TagsPage,
  InstructionPage,
  NotFoundPage
} from './components'

class App extends React.Component {
  shouldComponentUpdate() {
    return false
  }
  render() {
    return (
      <Fragment>
        <Navbar brand="LINKHUB" />
        <Switch>
          <Route exact path="/" component={LinksPage} />
          <Route path="/links" component={LinksPage} />
          <Route path="/tag" component={LinksPage} />
          <Route path="/person" component={LinksPage} />
          <Route path="/tags" component={TagsPage} />
          <Route exact path="/signin/" component={SigninPage} />
          <Route exact path="/signup/" component={SignupPage} />
          <Route exact path="/instruction/" component={InstructionPage} />
          <Redirect from="/signout" to="/signin" />
          <Route component={NotFoundPage} />
        </Switch>
      </Fragment>
    )
  }
}

export default App
