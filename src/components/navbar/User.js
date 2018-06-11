import React, { Fragment } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { signoutSuccess as signout } from 'redux/modules/auth'
import { Link, withRouter } from 'react-router-dom'

import { ButtonTransparent } from 'ui'

const handleClickSignOut = (signout, history) => async event => {
  event.preventDefault()
  await signout()
  history.replace('/')
}

const User = ({ authenticated, userName, signout, history }) =>
  authenticated ? (
    <ButtonTransparent
      mx={[0, 2]}
      onClick={handleClickSignOut(signout, history)}
    >
      Signout
    </ButtonTransparent>
  ) : (
    <Fragment>
      <ButtonTransparent is={Link} mx={[0, 2]} to={'/signin'}>
        Signin
      </ButtonTransparent>
      <ButtonTransparent is={Link} mx={[0, 2]} to={'/signup'}>
        Signup
      </ButtonTransparent>
    </Fragment>
  )

const mapState = ({ auth }, ownProps = {}) => ({
  authenticated: auth.authenticated,
  userName: auth.userId
})

export default compose(
  connect(
    mapState,
    { signout }
  ),
  withRouter
)(User)
