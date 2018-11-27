const initialState = {
  show: false,
  message: null
}

const reducer = (state = initialState, action) => {
  if(action.type === 'NOTIFICATION') {
    return { ...state, show: true, message: action.message }
  } else if(action.type === 'NOTIFICATION_CLEAR') {
    return initialState
  }
  return state
}

export default reducer