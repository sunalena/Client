import React from 'react'
import { Container, Heading } from 'rebass'

export const Page = ({ title, children }) => (
  <Container color="base">
    <Heading h3="true" my={2} textAlign="center">
      {title}
    </Heading>
    {children}
  </Container>
)

export default Page
