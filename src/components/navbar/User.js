import React, { Fragment } from 'react'
import { Nav, NavItem, UncontrolledTooltip } from 'reactstrap'
import { Link, withRouter } from 'react-router-dom'

import { Button, Caps, Flex, NavLink, Fixed as Fx } from 'rebass'

import { IconSignIn, IconSignOut, IconUser } from '../icons'

const handleClickSignOut = (signout, history) => async event => {
  event.preventDefault()
  await signout()
  history.replace('/')
}

const User = ({ authenticated, userName, signout, history }) =>
  authenticated ? (
    <NavLink
      is={Button}
      mx={[0, 2]}
      onClick={handleClickSignOut(signout, history)}
    >
      Signout
    </NavLink>
  ) : (
    <Fragment>
      <NavLink is={Link} mx={[0, 2]} to={'/signin'}>
        Signin
      </NavLink>
      <NavLink is={Link} mx={[0, 2]} to={'/signup'}>
        Signup
      </NavLink>
    </Fragment>
  )

export default withRouter(User)
