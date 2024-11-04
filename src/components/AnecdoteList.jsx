import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notifyVote } from '../reducers/notificationReducer'
import { useMemo } from 'react'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (id) => {
    const anecdote = anecdotes.find(anecdote => anecdote.id === id)
    if (anecdote) {
      dispatch(voteAnecdote(id))
      dispatch(notifyVote(anecdote.content))
    }
  }

  const filteredAnecdotes = useMemo(() => {
    return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  }, [anecdotes, filter])

  return (
    <div>
      {filteredAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList