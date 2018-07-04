import gql from 'graphql-tag.macro'

const FRAGMENT_SELECT_PERSON = gql`
  fragment SelectPerson on Person {
    value: id
    label: firstName
  }
`

export const SELECT_PERSON = gql`
  query Item($value: Int!) {
    item: personById(id: $value) {
      ...SelectPerson
    }
  }
  ${FRAGMENT_SELECT_PERSON}
`

export const SELECT_LIST_PERSON = gql`
  query List($first: Int!, $after: Cursor, $searchValue: String) {
    list: allPeople(
      first: $first
      after: $after
      filter: { firstName: { includesInsensitive: $searchValue } }
    ) {
      nodes {
        ...SelectPerson
      }
    }
  }
  ${FRAGMENT_SELECT_PERSON}
`
