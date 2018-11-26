import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import counterReducer from './reducer'
import App from './App'

const store = createStore(counterReducer)

const render = () =>
  ReactDOM.render(
    <App store={store} />,
    document.getElementById('root'))

render()
store.subscribe(render)
