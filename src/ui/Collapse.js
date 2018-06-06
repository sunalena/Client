// import React from 'react'
import sc from 'styled-components'
import { Flex } from 'rebass'

const Collapse = sc(Flex)`
  visibility: ${({ hidden }) => (hidden ? 'hidden' : 'visible')};
`

// /<Collapse
//         flexDirection={['column', 'row']}
//         alignItems={['flex-start', 'center']}
//         hidden={false}
//       >

export default Collapse
