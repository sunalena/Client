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
      <Label htmlFor={input.id}>{label}</Label>
      {meta.error &&
        meta.touched && (
          <Label color="accent" htmlFor={input.id}>
            {' '}
            {meta.error}
          </Label>
        )}
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
  textarea = false,
  isrequire = true
) => (
  <Field
    name={name}
    label={label}
    validate={isrequire ? required : undefined}
    component={InputAdapter}
    type={type}
    placeholder={placeholder}
    textarea={textarea}
  />
)
