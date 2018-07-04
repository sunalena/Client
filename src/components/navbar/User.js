import React, { Fragment } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { signoutSuccess as signout } from 'redux/modules/auth'
import { Link, withRouter } from 'react-router-dom'

import { Button } from 'ui'

const handleClickSignOut = (signout, history) => async event => {
  event.preventDefault()
  await signout()
  history.replace('/')
}

const User = ({ authenticated, userName, signout, history }) =>
  authenticated ? (
    <Fragment>
      <Button mx={[0, 2]}>{userName}</Button>
      <Button mx={[0, 2]} onClick={handleClickSignOut(signout, history)}>
        Signout
      </Button>
    </Fragment>
  ) : (
    <Fragment>
      <Button is={Link} mx={[0, 2]} to={'/signin'}>
        Signin
      </Button>
      <Button is={Link} mx={[0, 2]} to={'/signup'}>
        Signup
      </Button>
    </Fragment>
  )

const mapState = ({ auth }, ownProps = {}) => ({
  authenticated: auth.authenticated,
  userName: auth.userName
})

export default compose(
  connect(
    mapState,
    { signout }
  ),
  withRouter
)(User)
