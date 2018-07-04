const SIGNIN_SUCCESS = 'auth/SINGIN_SUCCESS'
const SIGNOUT_SUCCESS = 'auth/SINGOUT_SUCCESS'

const userId = Number(localStorage.getItem('userId'))
const userName = localStorage.getItem('userName')
const token = localStorage.getItem('token')

const initialState = {
  authenticated: !!userId && !!token,
  userId,
  userName,
  token
}

// reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      const { token, userId, userName } = action.payload
      return {
        ...state,
        token,
        userName,
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
export const signinSuccess = (token, userId, userName) => {
  localStorage.setItem('token', token)
  localStorage.setItem('userId', userId)
  localStorage.setItem('userName', userName)

  return {
    type: SIGNIN_SUCCESS,
    payload: {
      token,
      userId,
      userName
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
