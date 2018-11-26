const actionFor = {
  anecdoteCreation: (anecdote) => ({
    type: 'NEW_ANECDOTE',
    data: anecdote
  }),
  vote: id => ({
    type: 'VOTE',
    data: id
  })
}

export default actionFor
