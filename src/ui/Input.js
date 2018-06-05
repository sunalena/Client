import React from 'react'

import { Group, Label, Input as In, Textarea } from 'rebass'

export const Input = ({ label, textarea, ...props }) => (
  <Group flexDirection="column">
    <Label>{label}</Label>
    {!textarea ? <In {...props} /> : <Textarea {...props}> </Textarea>}
  </Group>
)

export default Input
