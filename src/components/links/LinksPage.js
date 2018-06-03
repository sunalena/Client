import React from 'react'

import { Link, Route, Switch } from 'react-router-dom'

import { Box, Heading, Flex, NavLink } from 'rebass'

import LinksList from './LinksList'
import LinkPage from './LinkPage'
import LinkForm from './LinkForm'

const CreateLinkButton = () => (
  <NavLink to="/links/create" is={Link}>
    Create Link
  </NavLink>
)

const BackLink = url => () => (
  <NavLink is={Link} to={url}>
    Back
  </NavLink>
)

const LinksPage = ({ match, ...rest }) => (
  <Box>
    <Flex my={2}>
      <Heading>Links</Heading>
      <Box m={'auto'} />
      <Route exact path={match.url} render={CreateLinkButton} />
      <Route exact path={`${match.url}/:linkId`} render={BackLink(match.url)} />
    </Flex>
    <Switch>
      <Route exact path={`${match.url}/create`} component={LinkForm} />
      <Route exact path={`${match.url}/:linkId`} component={LinkPage} />
    </Switch>
    <Route exact path={match.url} component={LinksList} />
  </Box>
)

export default LinksPage
