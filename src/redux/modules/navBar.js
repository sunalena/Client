// Actions
const CHANGE_SEARCH_VALUE = 'navbar/CHANGE_SEARCH_VALUE'
const CHANGE_MENU_STATUS = 'navbar/CHANGE_MENU_STATUS'

const INITIAL_STATE = {
  searchValue: '',
  menuIsActive: false
}

// Reducer
export default function reducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case CHANGE_SEARCH_VALUE:
      return {
        ...state,
        searchValue: payload
      }
    case CHANGE_MENU_STATUS:
      return {
        ...state,
        menuIsActive: !state.menuIsActive
      }
    default:
      return state
  }
}

// Action creators
export const changeSearchValue = searchValue => ({
  type: CHANGE_SEARCH_VALUE,
  payload: searchValue
})

export const changeMenuStatus = () => ({
  type: CHANGE_MENU_STATUS
})
