import React, { Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'

import { PageWithLink, RightLink } from 'ui'

import TagsList from './TagsList'
import TagPage from './TagPage'
import TagForm from './TagForm'

const rightLink = url => (
  <Fragment>
    <Route
      exact
      path={url}
      render={() => <RightLink to={'/tags/create'} name="Create Tag" />}
    />
    <Route
      exact
      path={`${url}/:tagId`}
      render={() => <RightLink to={url} name="Back" />}
    />
  </Fragment>
)

export const TagsPage = ({ match = {} }) => (
  <PageWithLink title="Tags" rightLink={rightLink(match.url)}>
    <Switch>
      <Route exact path={`${match.url}/create`} component={TagForm} />
      <Route exact path={`${match.url}/:tagId`} component={TagPage} />
    </Switch>
    <Route exact path={match.url} component={TagsList} />
  </PageWithLink>
)

export default TagsPage
