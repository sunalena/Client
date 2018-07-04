import React, { Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'

import { PageWithLink, RightLink } from 'ui'

import LinksList, { LinkListByTag } from './LinksList'
import LinkForm from './LinkForm'

const rightLink = url => (
  <Fragment>
    <Route
      exact
      path={url}
      render={() => <RightLink to={'/links/create'} name="Create Link" />}
    />
    <Route
      exact
      path={`${url}/:linkId`}
      render={() => <RightLink to={url} name="Back" />}
    />
  </Fragment>
)

export const LinksPage = ({ match = {} }) => (
  <PageWithLink title="Links" rightLink={rightLink(match.url)}>
    <Switch>
      <Route exact path={`/links/:linkId`} component={LinkForm} />
      <Route exact path={match.url} component={LinksList} />
    </Switch>
    <Route path={`/tag/:tagId/links`} component={LinkListByTag} />
    <Route path={`/person/:personId/links`} component={LinksList} />
  </PageWithLink>
)

export default LinksPage
