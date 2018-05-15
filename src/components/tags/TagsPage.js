import React from 'react'

import { Link, Route, Switch } from 'react-router-dom'

import { Row, Col } from 'reactstrap'

import TagsList from './TagsList'
import TagPage from './TagPage'
import TagForm from './TagForm'

const CreateTagLink = () => (
  <Link to="/tags/create" className="btn btn-primary pull-right">
    Create Tag
  </Link>
)

const TagsPage = ({ match, ...rest }) => (
  <Row>
    <Col xs="12">
      <h1>
        Tags
        <Route exact path={match.url} render={CreateTagLink} />
      </h1>
      <hr />
      <Switch>
        <Route exact path={`${match.url}/create`} component={TagForm} />
        <Route exact path={`${match.url}/:tagId`} component={TagPage} />
      </Switch>
      <Route exact path={match.url} component={TagsList} />
    </Col>
  </Row>
)

export default TagsPage
