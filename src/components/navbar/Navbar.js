import React from 'react'
import { Link } from 'react-router-dom'
import { NavLink, Toolbar, Box, Caps, Flex } from 'rebass'

const Navbar = ({ brand }) => (
  <Toolbar>
    <Flex
      flexDirection={['column', 'row']}
      w={1}
      alignItems={['flex-start', 'center']}
    >
      <Box mx={'auto'} />
      <Caps fontWeight="bold" p={2}>
        {brand}
      </Caps>
      <Box mx="auto" />
      <Box mx="auto" />
      <NavLink is={Link} mx={[0, 2]} to={'/links'}>
        Links
      </NavLink>
      <NavLink is={Link} mx={[0, 2]} to={'/tags'}>
        Tags
      </NavLink>
      <NavLink is={Link} mx={[0, 2]} to={'/users'}>
        Users
      </NavLink>
      <Box mx={'auto'} />
    </Flex>
  </Toolbar>
)

export default Navbar
