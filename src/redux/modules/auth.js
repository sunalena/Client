const SIGNIN_SUCCESS = 'auth/SINGIN_SUCCESS'
const SIGNOUT_SUCCESS = 'auth/SINGOUT_SUCCESS'

const userId = Number(localStorage.getItem('userId'))
const token = localStorage.getItem('token')

const initialState = {
  authenticated: !!userId && !!token,
  userId,
  token
}

// reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      const { token, userId } = action.payload
      return {
        ...state,
        token,
        userId,
        authenticated: true
      }
    case SIGNOUT_SUCCESS:
      return {
        ...state,
        token: undefined,
        userId: undefined,
        authenticated: false
      }
    default:
      return state
  }
}

// action creators
export const signinSuccess = (token, userId) => {
  localStorage.setItem('token', token)
  localStorage.setItem('userId', userId)
  return {
    type: SIGNIN_SUCCESS,
    payload: {
      token,
      userId
    }
  }
}

export const signoutSuccess = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  return {
    type: SIGNOUT_SUCCESS
  }
}
