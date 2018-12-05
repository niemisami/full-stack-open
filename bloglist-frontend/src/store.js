import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import authReducer from './reducers/authReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  auth: authReducer,
  blogs: blogReducer,
  users: userReducer,
  notification: notificationReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store