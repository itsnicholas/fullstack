import loginService from '../services/login'
import storage from '../utils/storage'

const userReducer = (state = null, action) => {
  switch(action.type) {
    case 'LOG_IN':
      console.log(action.data, 'action.data in LOG_IN in userReducer.js')
      return action.data
    case 'INIT_USER':
      console.log(action.data, 'action.data in INIT_USER in userReducer.js')
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
      console.log(user, 'user in logInUser in userReducer.js')
      dispatch({
        type: 'LOG_IN',
        data: user,
      })
    } catch(error) {
      console.log(JSON.stringify(error.response.data.error), 'error.response.data.error in logInUser in userReducer.js')
      dispatch(notificationChange('invalid username or password'))
    } 
  }
}

export const initializeUser = () => {
  return async dispatch => {
    const user = await storage.loadUser()
    console.log(user, 'user in initializeUser in userReducer.js')
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