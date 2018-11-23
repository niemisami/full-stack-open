import React from 'react'

const LoginForm = ({ username, password, onInputChange, onSubmit, error }) =>
  <div>
    {error && <div><p>{error}</p></div>}
    <h1 className='header'>Log in to application</h1>
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor='username' >Nimi: </label>
        <input
          name='username'
          value={username}
          onChange={onInputChange} />
      </div>
      <div>
        <label htmlFor='password' >Salasana: </label>
        <input
          name='password'
          value={password}
          onChange={onInputChange} />
      </div>
      <button type="submit">Tallenna</button>
    </form>
  </div>

export default LoginForm
