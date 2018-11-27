
import anecdoteService from './services/anecdotes'

export const createAnecdote = content => async dispatch => {
  const newAnecdote = await anecdoteService.createNew({ content, votes: 0 })
  dispatch(notifyWith('New anecdote ' + content + ' created', 1))


  dispatch({ type: 'CREATE', data: newAnecdote })
}
export const anecdoteInitialization = () => async dispatch => {
  const anecdotes = await anecdoteService.getAll()

  dispatch({ type: 'INIT_ANECDOTES', data: anecdotes })
}

export const vote = anecdote => async dispatch => {
  const withVote = { ...anecdote, votes: anecdote.votes + 1 }
  const updatedAnecdote = await anecdoteService.update(withVote)
  dispatch(notifyWith('Liked: ' + anecdote.content, 1))
  setTimeout(() => dispatch(clearNotification()), 5000)

  dispatch({
    type: 'VOTE',
    data: updatedAnecdote.id
  })

}
export const notifyWith = (message, seconds = 5) => async dispatch => {
  dispatch(showNotification(message))
  setTimeout(() => {
    dispatch(clearNotification())
  }, seconds * 1000)
}

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
