import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Toolbar, Box, Caps, Flex, NavLink, Fixed, Container } from 'ui'

import User from './UserContainer'

const Links = () => (
  <Fragment>
    <NavLink is={Link} mx={[0, 2]} to={'/links'}>
      Links
    </NavLink>
    <NavLink is={Link} mx={[0, 2]} to={'/tags'}>
      Tags
    </NavLink>
    <NavLink is={Link} mx={[0, 2]} to={'/users'}>
      Users
    </NavLink>
  </Fragment>
)

export const Navbar = ({ brand }) => (
  <Fixed top={0} left={0} right={0}>
    <Toolbar>
      <Container
        is={Flex}
        w={1}
        flexDirection={['column', 'row']}
        alignItems={['flex-start', 'center']}
      >
        <NavLink is={Link} mx={[0, 2]} to={'/'}>
          <Caps fontWeight="bold">{brand}</Caps>
        </NavLink>
        <Box mx="auto" />
        <Box mx="auto" />
        <Links />
        <Box mx="auto" />
        <User />
      </Container>
    </Toolbar>
  </Fixed>
)

export default Navbar
