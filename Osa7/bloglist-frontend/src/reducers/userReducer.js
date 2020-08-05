import loginService from '../services/login'
import storage from '../utils/storage'

const userReducer = (state = null, action) => {
  switch(action.type) {
    case 'LOG_IN':
      return action.data
    case 'INIT_USER':
      return action.data
    case 'LOG_OUT':
      return action.data
    default:
      return state
  }
}

export const logInUser = (username, password, notificationChange, loginNotificationChange) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      storage.saveUser(user)
      dispatch(loginNotificationChange(user))
      dispatch({
        type: 'LOG_IN',
        data: user,
      })
    } catch(error) {
      dispatch(notificationChange('invalid username or password'))
    } 
  }
}

export const initializeUser = () => {
  return async dispatch => {
    const user = await storage.loadUser()
    dispatch({
      type: 'INIT_USER',
      data: user,
    })
  }
}

export const logOutUser = () => {
  return dispatch => {
    storage.logoutUser()
    dispatch({
      type: 'LOG_OUT',
      data: null,
    })
  }
}

export default userReducer