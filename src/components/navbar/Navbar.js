import React, { Fragment } from 'react'

import { Link } from 'react-router-dom'
import { Toolbar as Tb, Box, Caps, Flex, NavLink, Fixed as Fx } from 'rebass'

import User from './UserContainer'

const Fixed = Fx.extend`
  z-index: 1;
`

const Toolbar = Tb.extend`
  background-color: #444;
`

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

const Navbar = ({ brand }) => (
  <Fixed top={0} left={0} right={0}>
    <Toolbar>
      <Flex
        flexDirection={['column', 'row']}
        alignItems={['flex-start', 'center']}
        w={1}
      >
        <Box mx="auto" />
        <NavLink is={Link} mx={[0, 2]} to={'/'}>
          <Caps fontWeight="bold">{brand}</Caps>
        </NavLink>
        <Box mx="auto" />
        <Box mx="auto" />
        <Links />
        <Box mx="auto" />
        <User />
        <Box mx="auto" />
      </Flex>
    </Toolbar>
  </Fixed>
)

export default Navbar
