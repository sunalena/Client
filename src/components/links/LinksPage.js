import React from 'react'

import { Link, Route, Switch } from 'react-router-dom'

import { Row, Col } from 'reactstrap'

import LinksList from './LinksList'
import LinkPage from './LinkPage'
import LinkForm from './LinkForm'

const CreateLinkButton = () => (
  <Link to="/links/create" className="btn btn-primary pull-right">
    Create Link
  </Link>
)

const BackLink = match => () => (
  <Link to={match.url} className="btn btn-primary pull-right">
    Back
  </Link>
)

const LinksPage = ({ match, ...rest }) => (
  <Row>
    <Col xs="12">
      <h1>
        <span>Links</span>
        <Route exact path={match.url} render={CreateLinkButton} />
        <Route exact path={`${match.url}/:linkId`} render={BackLink(match)} />
      </h1>
      <hr />
      <Switch>
        <Route exact path={`${match.url}/create`} component={LinkForm} />
        <Route exact path={`${match.url}/:linkId`} component={LinkPage} />
      </Switch>
      <Route exact path={match.url} component={LinksList} />
    </Col>
  </Row>
)

export default LinksPage
