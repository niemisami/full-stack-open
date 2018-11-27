const initialState = ''

const reducer = (state = initialState, action) => {
  if(action.type === 'FILTER') {
    return action.filter
  }
  return state
}

export default reducer