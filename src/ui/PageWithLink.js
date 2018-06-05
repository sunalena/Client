import React from 'react'
import { Container, Heading, Flex, Box } from 'rebass'

export const PageWithLink = ({ title, rightLink, children }) => (
  <Container>
    <Flex my={2}>
      <Heading>{title}</Heading>
      <Box m="auto" />
      {rightLink}
    </Flex>
    {children}
  </Container>
)

export default PageWithLink
