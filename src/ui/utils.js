import React, { Fragment } from 'react'
import { Field } from 'react-final-form'

import { Input, Label } from 'ui'

export const InputAdapter = ({ input, label, meta, placeholder, type }) => (
  <Fragment>
    <Label>{label}</Label>
    {meta.error && meta.touched && <Label color="accent"> {meta.error}</Label>}
    <Input {...input} type={type} placeholder={placeholder} />
  </Fragment>
)

export const required = value => (value ? undefined : 'Required')

export const subscription = { submitting: true, pristine: true }

export const renderInput = (name, label, placeholder, type = 'text') => (
  <Field
    name={name}
    label={label}
    validate={required}
    component={InputAdapter}
    type={type}
    placeholder={placeholder}
  />
)
