import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from './reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const anecdoteInputRef = useRef()

  const createAnecdote = (event) => {
    event.preventDefault()
    const content = anecdoteInputRef.current.value
    if (content) {
      dispatch(addAnecdote(content))
      dispatch(setNotification(`New anecdote '${content}' created!`, 5))
      anecdoteInputRef.current.value = ''
    }
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input ref={anecdoteInputRef} /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm