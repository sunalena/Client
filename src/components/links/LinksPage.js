import React, { Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'

import { PageWithLink, RightLink } from 'ui'

import LinksList from './LinksList'
import LinkPage from './LinkPage'
import LinkForm from './LinkForm'

const rightLink = url => (
  <Fragment>
    <Route
      exact
      path={url}
      render={() => <RightLink url={'/links/create'} name="Create Link" />}
    />
    <Route
      exact
      path={`${url}/:linkId`}
      render={() => <RightLink url={url} name="Back" />}
    />
  </Fragment>
)

export const LinksPage = ({ match = {} }) => (
  <PageWithLink title="Links" rightLink={rightLink(match.url)}>
    <Switch>
      <Route exact path={`${match.url}/create`} component={LinkForm} />
      <Route exact path={`${match.url}/:linkId`} component={LinkPage} />
    </Switch>
    <Route exact path={match.url} component={LinksList} />
  </PageWithLink>
)

export default LinksPage
