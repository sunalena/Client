import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'

import { Button, NavLink } from 'rebass'

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
