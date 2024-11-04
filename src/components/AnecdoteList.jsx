import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useMemo } from 'react'

const AnecdoteList = () => {
  const dispatch = useDispatch()  
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => 
    state.anecdotes.sort((a, b) => b.votes - a.votes)
  )

  const vote = (anecdote) => {
      dispatch(voteAnecdote(anecdote.id))
      dispatch(setNotification(`You voted '${anecdote.content}'`, 5))
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
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList