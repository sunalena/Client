import React from 'react'
import { Link } from 'react-router-dom'
import { ButtonTransparent } from 'ui'

export const RightLink = ({ to, name }) => (
  <ButtonTransparent is={Link} to={to}>
    {name}
  </ButtonTransparent>
)
