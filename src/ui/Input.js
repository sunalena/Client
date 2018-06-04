import React from 'react'

import { Group, Label, Input } from 'rebass'

const Input = ({ label, ...props }) => (
  <Group>
    <Label>{label}</Label>
    <Input {...props} />
  </Group>
)

export default Input
