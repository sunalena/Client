import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'ui'

export const RightLink = ({ to, name }) => (
  <Button is={Link} to={to}>
    {name}
  </Button>
)
