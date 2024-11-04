import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [
    { id: 1, content: 'Anecdote 1', votes: 0 },
    { id: 2, content: 'Anecdote 2', votes: 0 },
  ],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(anecdote => anecdote.id === id)
      if (anecdoteToVote) {
        anecdoteToVote.votes += 1
      }
    },
    addAnecdote: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(content) {
        return {
          payload: {
            id: Math.floor(Math.random() * 100000),
            content,
            votes: 0,
          },
        }
      },
    },
  },
})

export const { voteAnecdote, addAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer