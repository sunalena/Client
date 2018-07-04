import React, { Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'

import { PageWithLink, RightLink } from 'ui'

import LinksList, { LinkListByTag } from './LinksList'
import LinkPage from './LinkPage'
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

export const LinksPage = ({ match = {} }) =>
  console.log(match.url) || (
    <PageWithLink title="Links" rightLink={rightLink(match.url)}>
      <Switch>
        <Route exact path={`/links/create`} component={LinkForm} />
        <Route exact path={`/links/:linkId`} component={LinkPage} />
      </Switch>
      <Route exact path={match.url} component={LinksList} />
      <Route path={`/tag/:tagId/links`} component={LinkListByTag} />
      <Route path={`/person/:personId/links`} component={LinksList} />
    </PageWithLink>
  )

export default LinksPage
