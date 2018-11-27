export const createAnecdote = (anecdote) => ({
  type: 'CREATE',
  data: anecdote
})
export const anecdoteInitialization = anecdotes => ({
  type: 'INIT_ANECDOTES',
  data: anecdotes
})
export const vote = id => ({
  type: 'VOTE',
  data: id
})
export const showNotification = message => ({
  type: 'NOTIFICATION',
  message
})
export const clearNotification = () => ({
  type: 'NOTIFICATION_CLEAR'
})
export const filterList = filter => ({
  type: 'FILTER',
  filter
})
