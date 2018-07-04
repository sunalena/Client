import React, { Fragment } from 'react'
import { Field } from 'react-final-form'

import { Input, TextArea, Label } from 'ui'

export const InputAdapter = ({
  input,
  label,
  meta,
  placeholder,
  type,
  textarea
}) => {
  const InputComponent = textarea ? TextArea : Input
  return (
    <Fragment>
      <Label>{label}</Label>
      {meta.error &&
        meta.touched && <Label color="accent"> {meta.error}</Label>}
      <InputComponent
        {...input}
        type={type}
        rows={7}
        placeholder={placeholder}
      />
    </Fragment>
  )
}

export const required = value => (value ? undefined : 'Required')

export const subscription = { submitting: true, pristine: true }

export const renderInput = (
  name,
  label,
  placeholder,
  type = 'text',
  textarea = false
) => (
  <Field
    name={name}
    label={label}
    validate={required}
    component={InputAdapter}
    type={type}
    placeholder={placeholder}
    textarea={textarea}
  />
)
