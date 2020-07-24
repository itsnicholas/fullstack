const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NOTIFICATION':
      return action.data
    default:
      return state
  }
}

var myVar

export const notificationChange = (notification, time) => {

  time = time * 1000
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
    }, time)
  }  
}
  
export default notificationReducer