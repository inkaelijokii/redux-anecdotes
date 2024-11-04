import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const notifyAnecdoteCreation = (content) => {
    return (dispatch) => {
      dispatch(setNotification(`Created new anecdote: "${content}"`))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    }
  }

export const notifyVote = (content) => {
  return (dispatch) => {
    dispatch(setNotification(`You voted: "${content}"`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export default notificationSlice.reducer