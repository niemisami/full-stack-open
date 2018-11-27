const sortByVotes = anecdotes => anecdotes.sort((a, b) => b.votes - a.votes)

const reducer = (state = [], action) => {
  if(action.type === 'CREATE') {
    return state.concat(action.data)
  } else if(action.type === 'VOTE') {
    return sortByVotes(state.map(anecdote =>
      anecdote.id !== action.data
        ? anecdote
        : { ...anecdote, votes: anecdote.votes + 1 }))
  } else if(action.type === 'INIT_ANECDOTES') {
    return action.data
  }
  return state
}

export default reducer