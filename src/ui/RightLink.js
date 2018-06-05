import React from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'rebass'

export const RightLink = ({ to, name }) => (
  <NavLink is={Link} to={to}>
    {name}
  </NavLink>
)
