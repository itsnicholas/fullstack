import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  //const style = {
  //  border: 'solid',
  //  padding: 10,
  //  borderWidth: 1
  //}

  if (notification !== '') {
    return (
      //<div style={style}>
      <div>
        <Alert severity="info">
          {notification}
        </Alert>
      </div>
    )
  } else {
    return (
      <div>
      </div>
    )
  }
}

export default Notification