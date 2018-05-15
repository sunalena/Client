import React from 'react'

export default Component => ({ ...props }) => (
  <Component
    width="16"
    height="16"
    fill="none"
    stroke="currentcolor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="3"
    {...props}
  />
)
