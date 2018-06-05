import React from 'react'
import { Container, Heading } from 'rebass'

export const Page = ({ title, children }) => (
  <Container>
    <Heading h3="true" my={2}>
      {title}
    </Heading>
    {children}
  </Container>
)

export default Page
