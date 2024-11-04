import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

export const fetchAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll()
  dispatch(setAnecdotes(anecdotes))
}

export const addAnecdote = (content) => async (dispatch) => {
  const newAnecdote = await anecdoteService.createAnecdote(content)
  dispatch(createAnecdote(newAnecdote))
}

export const voteAnecdote = (id) => async (dispatch, getState) => {
  const anecdoteToVote = getState().anecdotes.find(a => a.id === id)
  const updatedAnecdote = {
    ...anecdoteToVote,
    votes: anecdoteToVote.votes + 1
  }
  await anecdoteService.updateAnecdote(id, updatedAnecdote)
  dispatch(updateAnecdote(updatedAnecdote))
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    updateAnecdote(state, action) {
      return state.map(anecdote =>
        anecdote.id !== action.payload.id ? anecdote : action.payload
      )
    }
  }
})

export const { setAnecdotes, createAnecdote, updateAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer