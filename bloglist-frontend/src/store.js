import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import authReducer from './reducers/authReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import commentReducer from './reducers/commentReducer'


const reducer = combineReducers({
  auth: authReducer,
  blogs: blogReducer,
  users: userReducer,
  notification: notificationReducer,
  comments: commentReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store