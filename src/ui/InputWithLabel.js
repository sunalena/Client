import React from 'react'

import { Group, Label, Input, Textarea } from 'rebass'

export const InputWithLabel = ({ label, textarea, ...props }) => (
  <Group flexDirection="column">
    <Label>{label}</Label>
    {!textarea ? <Input {...props} /> : <Textarea {...props}> </Textarea>}
  </Group>
)

export default InputWithLabel
