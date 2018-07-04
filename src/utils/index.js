import { transform, isEqual, isObject } from 'lodash'

export const mutateProp = name => ({
  props: ({ mutate }) => ({
    [name]: variables =>
      mutate({
        variables
      })
  })
})

export const objectDifference = (object, base) => {
  return transform(object, (result, value, key) => {
    if (!isEqual(value, base[key])) {
      result[key] =
        isObject(value) && isObject(base[key])
          ? objectDifference(value, base[key])
          : value
    }
  })
}

export const getPatch = diff => {
  const keys = Object.keys(diff)
  return keys.reduce(
    (acc, key) =>
      typeof diff[key] === 'object'
        ? {
            ...acc,
            [key + 'Id']: diff[key].value
          }
        : {
            ...acc,
            [key]: diff[key]
          },
    {}
  )
}

const trObj = obj => {
  const keys = Object.keys(obj)
  return keys.reduce((acc, key) => ({ ...acc, [key]: { value: obj[key] } }), {})
}

export const getInitValues = tableName => ({ location, ...rest }) => {
  const { nodeId, ...initValues } = rest[tableName] || {}
  const createValues = trObj(location.query || {})
  const initialValues = { ...initValues, ...createValues }
  return { initialValues }
}

export const required = value => (value ? undefined : 'Required')

export const subscription = { submitting: true, pristine: true }
