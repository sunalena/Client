import React from 'react'
import { Container } from 'rebass'

export const PageWithLink = ({ title, rightLink, children }) => (
  <Container maxWidth={800} px={[0, 3]} color="base">
    {/* <Flex my={2}>
      <Heading>{title}</Heading>
      <Box m="auto" />
      {rightLink}
    </Flex> */}
    {children}
  </Container>
)

export default PageWithLink
