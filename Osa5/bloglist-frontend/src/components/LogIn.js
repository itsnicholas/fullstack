import React from 'react'
import ErrorNotification from './ErrorNotification'
import PropTypes from 'prop-types'

const LogIn = ({
  error,
  handleLogin,
  username,
  handleUsernameChange,
  password,
  handlePasswordChange
}) => {

  LogIn.propTypes = {
    error: PropTypes.string,
    handleLogin: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    handlePasswordChange: PropTypes.func.isRequired
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <ErrorNotification error={error} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            id="username"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            type="password"
            id="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

export default LogIn