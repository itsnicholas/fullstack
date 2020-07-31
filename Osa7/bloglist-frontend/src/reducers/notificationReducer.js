const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'NOTIFICATION':
    console.log(action.data, 'notificationReducer action.data')
    console.log(action.data.type, 'notificationReducer action.data.type')
    console.log(action.data.message, 'notificationReducer action.data.message')
    return action.data
  case 'NO_NOTIFICATION':
    return action.data
  default:
    return state
  }
}

export const notificationChange = (message, type) => {
  console.log(message, 'notificationChange message')
  console.log(type, 'notificationChange message')
  return {
    type: 'NOTIFICATION',
    data: { message, type }
  }
}

export const noNotification = () => {
  return {
    type: 'NO_NOTIFICATION',
    data: null
  }
}

export default notificationReducer