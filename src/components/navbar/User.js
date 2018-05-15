import React from 'react'
import { Nav, NavItem, UncontrolledTooltip, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { IconSignIn, IconSignOut, IconUser } from '../icons'
import { withRouter } from 'react-router-dom'

const handleClickSignOut = (signout, history) => async event => {
  event.preventDefault()
  await signout()
  history.replace('/')
}

const User = ({ authenticated, userName, signout, history }) => (
  <Nav navbar>
    {authenticated ? (
      ''
    ) : (
      <NavItem>
        <Link to="/signin/" style={{ color: 'white' }} id="signInIcon">
          <IconSignIn />
        </Link>
        <UncontrolledTooltip placement="right" target="signInIcon">
          Signin
        </UncontrolledTooltip>
      </NavItem>
    )}
    {authenticated ? (
      ''
    ) : (
      <NavItem className="ml-2">
        <Link to="/signup/" style={{ color: 'white' }} id="signUpIcon">
          <IconUser />
        </Link>
        <UncontrolledTooltip placement="right" target="signUpIcon">
          Signup
        </UncontrolledTooltip>
      </NavItem>
    )}
    {!authenticated ? (
      ''
    ) : (
      <NavItem className="ml-2">
        <Button
          onClick={handleClickSignOut(signout, history)}
          style={{ color: 'white' }}
          id="signOut"
        >
          <IconSignOut />
        </Button>
        <UncontrolledTooltip placement="right" target="signOut">
          Signout
        </UncontrolledTooltip>
      </NavItem>
    )}
  </Nav>
)

export default withRouter(User)
