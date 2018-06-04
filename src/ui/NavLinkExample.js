import React from 'react'

import { NavLink as Nv } from 'rebass'

const NavLink = Nv.extend`
  &:hover {
    background-color: ${props => props.theme.colors.black};
  }
`

export default NavLink
