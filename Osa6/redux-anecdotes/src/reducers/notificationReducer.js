const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'NOTIFICATION':
          return action.data
        default:
          return state
      }
    }

  export const notificationChange = (notification, time) => {
    console.log('notificationChange notification', notification)
    console.log('notificationChange time', time)
    time = time * 1000
    console.log('notificationChange time', time)
    return async dispatch => {
      dispatch({
        type: 'NOTIFICATION',
        data: notification
      })
      setTimeout(() => {
        dispatch({
          type: 'NOTIFICATION',
          data: ''
        })
      }, time)
    }
    
  }
  
  export default notificationReducer