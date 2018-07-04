import { createStore as _createStore, combineReducers } from 'redux'

import navBar from './modules/navBar'
import auth from './modules/auth'

const configureStore = (initialState = {}) => {
  const reducer = combineReducers({
    auth,
    navBar
  })
  return _createStore(
    reducer,
    initialState
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
}

export default configureStore
