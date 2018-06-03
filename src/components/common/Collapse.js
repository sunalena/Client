import React from 'react'

import { Flex } from 'rebass'

const Collapse = Flex.extend`
  visibility: ${({ hidden }) => (hidden ? 'hidden' : 'visible')};
`

{
  /* <Collapse
          flexDirection={['column', 'row']}
          alignItems={['flex-start', 'center']}
          hidden={false}
        > */
}

export default Collapse
