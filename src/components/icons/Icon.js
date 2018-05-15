import React from 'react'
import withOptions from './withOptions'

const IconSearch = ({
  id,
  viewBox,
  width,
  height,
  fill,
  stroke,
  strokeLinecap,
  strokeLinejoin,
  strokeWidth,
  children
}) => (
  <svg
    id={id}
    viewBox={viewBox || '0 0 32 32'}
    width={width || '32'}
    height={height || '32'}
    fill={fill || 'none'}
    stroke={stroke || 'currentcolor'}
    strokeLinecap={strokeLinecap || 'round'}
    strokeLinejoin={strokeLinejoin || 'round'}
    strokeWidth={strokeWidth || '2'}
  >
    {children}
  </svg>
)

export default withOptions(IconSearch)
