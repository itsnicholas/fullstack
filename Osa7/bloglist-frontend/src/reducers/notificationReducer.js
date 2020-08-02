const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'NOTIFICATION':
    console.log(action.data, 'notificationReducer action.data')
    return action.data
  default:
    return state
  }
}

var myVar

export const notificationChange = (notification) => {
  console.log(notification, 'notificationChange notificationReducer.js')
  clearTimeout(myVar)
  return async dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      data: notification
    })
    myVar = setTimeout(() => {
      dispatch({
        type: 'NOTIFICATION',
        data: ''
      })
    }, 5000)
  }
}

export const loginNotificationChange = (user) => {
  console.log(user, 'user in notificationReducer.js')
  clearTimeout(myVar)
  return async dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      data: `${user.username} welcome back!`
    })
    myVar = setTimeout(() => {
      dispatch({
        type: 'NOTIFICATION',
        data: ''
      })
    }, 5000)
  }
}

export default notificationReducer